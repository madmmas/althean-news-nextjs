const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://brilliant-dream-c3f2fe8788.strapiapp.com/api';

// Cache configuration - 5 minutes cache duration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
const CACHE_KEYS = {
  ARTICLES: 'strapi_articles_cache',
  ARTICLE_PREFIX: 'strapi_article_',
  SUMMARIES: 'strapi_summaries_cache',
} as const;

/**
 * Check if we're in the browser environment
 */
const isBrowser = typeof window !== 'undefined';

/**
 * Cache entry structure
 */
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

/**
 * Strapi image format structure
 */
interface StrapiImageFormat {
  url: string;
  width?: number;
  height?: number;
}

/**
 * Strapi image structure
 */
interface StrapiImage {
  url?: string;
  formats?: {
    large?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    small?: StrapiImageFormat;
    thumbnail?: StrapiImageFormat;
  };
  cover?: {
    url?: string;
    formats?: {
      large?: StrapiImageFormat;
      medium?: StrapiImageFormat;
      small?: StrapiImageFormat;
      thumbnail?: StrapiImageFormat;
    };
  };
  data?: {
    attributes?: {
      url: string;
    };
  };
  attributes?: {
    url: string;
  };
}

/**
 * Strapi article structure
 */
export interface StrapiArticle {
  id: number;
  slug: string;
  title: string;
  description?: string;
  excerpt?: string;
  content?: string;
  publishedAt?: string;
  createdAt?: string;
  cover?: StrapiImage;
  thumbnail?: StrapiImage;
  category?: {
    id?: number;
    name?: string;
    slug?: string;
  } | string;
  author?: {
    id?: number;
    name?: string;
    username?: string;
    avatar?: StrapiImage;
  };
  comments?: Array<unknown>;
}

/**
 * Strapi source component structure
 */
export interface StrapiSource {
  id?: number;
  source_name: string;
  url: string;
}

/**
 * Strapi summary structure
 * Based on Strapi content type: summaries
 */
export interface StrapiSummary {
  id: number;
  documentId: string; // documentId field from Strapi
  title: string;
  excerpt?: string;
  content: string; // richtext, required
  sources?: StrapiSource[]; // component, repeatable
  publishAt?: string; // datetime
  publishedAt?: string; // datetime (alternative field name)
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Strapi API response structure
 */
interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page?: number;
      pageSize?: number;
      pageCount?: number;
      total?: number;
    };
  };
}

/**
 * Pagination structure
 */
export interface Pagination {
  total: number;
  totalPages: number;
  page: number;
  pageSize: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/**
 * Cache info structure
 */
export interface CacheInfo {
  hasCache: boolean;
  age?: number; // seconds
  remaining?: number; // seconds
  expiresIn?: number; // milliseconds
}

/**
 * Get cached data with expiration check
 */
function getCachedData<T>(key: string): T | null {
  if (!isBrowser) return null;
  
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    
    const { data, timestamp }: CacheEntry<T> = JSON.parse(cached);
    const now = Date.now();
    
    // Check if cache is still valid
    if (now - timestamp < CACHE_DURATION) {
      return data;
    }
    
    // Cache expired, remove it
    localStorage.removeItem(key);
    return null;
  } catch (error) {
    console.error('Error reading cache:', error);
    return null;
  }
}

/**
 * Set cached data with timestamp
 */
function setCachedData<T>(key: string, data: T): void {
  if (!isBrowser) return;
  
  try {
    const cacheObject: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(cacheObject));
  } catch (error: unknown) {
    console.error('Error setting cache:', error);
    // If storage is full, try to clear old cache
    if (error instanceof Error && error.name === 'QuotaExceededError') {
      clearExpiredCache();
      try {
        const cacheObject: CacheEntry<T> = {
          data,
          timestamp: Date.now(),
        };
        localStorage.setItem(key, JSON.stringify(cacheObject));
      } catch (retryError) {
        console.error('Failed to set cache after cleanup:', retryError);
      }
    }
  }
}

/**
 * Clear expired cache entries
 */
function clearExpiredCache(): void {
  if (!isBrowser) return;
  
  try {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('strapi_')) {
        try {
          const cached = localStorage.getItem(key);
          if (cached) {
            const { timestamp }: CacheEntry<unknown> = JSON.parse(cached);
            if (Date.now() - timestamp >= CACHE_DURATION) {
              localStorage.removeItem(key);
            }
          }
        } catch (e) {
          // Invalid cache entry, remove it
          localStorage.removeItem(key);
        }
      }
    });
  } catch (error) {
    console.error('Error clearing expired cache:', error);
  }
}

/**
 * Fetch articles from Strapi with client-side caching
 */
export async function getArticles(): Promise<StrapiArticle[]> {
  // Check cache first
  const cachedArticles = getCachedData<StrapiArticle[]>(CACHE_KEYS.ARTICLES);
  if (cachedArticles) {
    console.log('Using cached articles');
    return cachedArticles;
  }
  
  try {
    console.log('Fetching fresh articles from API');
    const response = await fetch(`${STRAPI_API_URL}/articles?populate=*`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }
    
    const data: StrapiResponse<StrapiArticle[]> = await response.json();
    const articles = data.data || [];
    
    // Cache the articles
    setCachedData(CACHE_KEYS.ARTICLES, articles);
    
    return articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    
    // If fetch fails, try to return stale cache if available
    if (isBrowser) {
      try {
        const staleCache = localStorage.getItem(CACHE_KEYS.ARTICLES);
        if (staleCache) {
          const { data }: CacheEntry<StrapiArticle[]> = JSON.parse(staleCache);
          console.log('Using stale cache due to fetch error');
          return data;
        }
      } catch (e) {
        // Ignore stale cache errors
      }
    }
    
    return [];
  }
}

/**
 * Fetch a single article by slug with client-side caching
 */
export async function getArticleBySlug(slug: string | null | undefined): Promise<StrapiArticle | null> {
  if (!slug) return null;
  
  const cacheKey = `${CACHE_KEYS.ARTICLE_PREFIX}${slug}`;
  
  // Check cache first
  const cachedArticle = getCachedData<StrapiArticle>(cacheKey);
  if (cachedArticle) {
    console.log(`Using cached article: ${slug}`);
    return cachedArticle;
  }
  
  try {
    console.log(`Fetching fresh article from API: ${slug}`);
    const response = await fetch(
      `${STRAPI_API_URL}/articles?filters[slug][$eq]=${slug}&populate=*`,
      {
        cache: 'no-store',
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch article');
    }
    
    const data: StrapiResponse<StrapiArticle[]> = await response.json();
    const article = data.data && data.data.length > 0 ? data.data[0] : null;
    
    if (article) {
      // Cache the article
      setCachedData(cacheKey, article);
    }
    
    return article;
  } catch (error) {
    console.error('Error fetching article:', error);
    
    // If fetch fails, try to return stale cache if available
    if (isBrowser) {
      try {
        const staleCache = localStorage.getItem(cacheKey);
        if (staleCache) {
          const { data }: CacheEntry<StrapiArticle> = JSON.parse(staleCache);
          console.log(`Using stale cache for article: ${slug}`);
          return data;
        }
      } catch (e) {
        // Ignore stale cache errors
      }
    }
    
    return null;
  }
}

/**
 * Clear all article cache (useful for manual refresh)
 */
export function clearArticlesCache(): void {
  if (!isBrowser) return;
  
  try {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('strapi_')) {
        localStorage.removeItem(key);
      }
    });
    console.log('Articles cache cleared');
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
}

/**
 * Get cache info (for debugging)
 */
export function getCacheInfo(): CacheInfo | null {
  if (!isBrowser) return null;
  
  try {
    const articlesCache = localStorage.getItem(CACHE_KEYS.ARTICLES);
    if (articlesCache) {
      const { timestamp }: CacheEntry<unknown> = JSON.parse(articlesCache);
      const age = Date.now() - timestamp;
      const remaining = CACHE_DURATION - age;
      return {
        hasCache: true,
        age: Math.floor(age / 1000), // seconds
        remaining: Math.floor(remaining / 1000), // seconds
        expiresIn: Math.max(0, remaining),
      };
    }
    return { hasCache: false };
  } catch (error) {
    return null;
  }
}

/**
 * Get placeholder/dummy image URL
 * Returns a simple SVG placeholder as data URI
 */
export function getPlaceholderImageUrl(width: number = 800, height: number = 600): string {
  // Create a simple SVG placeholder as data URI
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#e0e0e0"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" fill="#999" text-anchor="middle" dominant-baseline="middle">
        Althean News
      </text>
    </svg>
  `.trim();
  
  const encodedSvg = encodeURIComponent(svg);
  return `data:image/svg+xml,${encodedSvg}`;
}

/**
 * Get image URL from Strapi, with fallback to placeholder
 * Supports: cover.url (direct), cover.formats (large/medium/small), and standard Strapi image structures
 */
export function getStrapiImageUrl(
  image: StrapiImage | string | null | undefined,
  usePlaceholder: boolean = true
): string | null {
  let imageUrl: string | null = null;
  
  if (image) {
    // Handle cover object directly (Strapi v4 format from your API)
    if (typeof image === 'object' && 'url' in image && image.url) {
      // Direct URL in cover object
      imageUrl = image.url.startsWith('http') ? image.url : `${STRAPI_API_URL.replace('/api', '')}${image.url}`;
    }
    // Handle cover.formats (prefer large, then medium, then small, then thumbnail)
    else if (typeof image === 'object' && 'formats' in image && image.formats) {
      if (image.formats.large?.url) {
        imageUrl = image.formats.large.url;
      } else if (image.formats.medium?.url) {
        imageUrl = image.formats.medium.url;
      } else if (image.formats.small?.url) {
        imageUrl = image.formats.small.url;
      } else if (image.formats.thumbnail?.url) {
        imageUrl = image.formats.thumbnail.url;
      }
    }
    // Handle cover.url directly (if cover is passed as the image parameter)
    else if (typeof image === 'object' && 'cover' in image && image.cover?.url) {
      const url = image.cover.url;
      imageUrl = url.startsWith('http') ? url : `${STRAPI_API_URL.replace('/api', '')}${url}`;
    }
    // Handle cover.formats
    else if (typeof image === 'object' && 'cover' in image && image.cover?.formats) {
      if (image.cover.formats.large?.url) {
        imageUrl = image.cover.formats.large.url;
      } else if (image.cover.formats.medium?.url) {
        imageUrl = image.cover.formats.medium.url;
      } else if (image.cover.formats.small?.url) {
        imageUrl = image.cover.formats.small.url;
      } else if (image.cover.formats.thumbnail?.url) {
        imageUrl = image.cover.formats.thumbnail.url;
      }
    }
    // Handle string URL
    else if (typeof image === 'string') {
      imageUrl = image.startsWith('http') ? image : `${STRAPI_API_URL.replace('/api', '')}${image}`;
    }
    // Handle nested structures (legacy support)
    else if (typeof image === 'object' && 'data' in image && image.data?.attributes) {
      const url = image.data.attributes.url;
      imageUrl = url.startsWith('http') ? url : `${STRAPI_API_URL.replace('/api', '')}${url}`;
    } else if (typeof image === 'object' && 'attributes' in image && image.attributes?.url) {
      const url = image.attributes.url;
      imageUrl = url.startsWith('http') ? url : `${STRAPI_API_URL.replace('/api', '')}${url}`;
    }
  }
  
  // Return placeholder if no image and placeholder is requested
  if (!imageUrl && usePlaceholder) {
    return getPlaceholderImageUrl();
  }
  
  return imageUrl;
}

/**
 * Server-side: fetch paginated articles for blog listing with optional search
 * Use in Server Components only (no localStorage).
 */
export async function fetchArticlesForBlog(
  page: number = 1,
  pageSize: number = 8,
  searchQuery: string = ''
): Promise<{ articles: StrapiArticle[]; pagination: Pagination }> {
  const base = STRAPI_API_URL.replace(/\/$/, '');
  const params = new URLSearchParams();
  params.set('populate', '*');
  params.set('sort', 'publishedAt:desc');
  params.set('pagination[page]', String(page));
  params.set('pagination[pageSize]', String(pageSize));

  if (searchQuery && searchQuery.trim()) {
    const q = searchQuery.trim();
    params.append('filters[$or][0][title][$containsi]', q);
    params.append('filters[$or][1][description][$containsi]', q);
  }

  try {
    const res = await fetch(`${base}/articles?${params.toString()}`, { 
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });
    if (!res.ok) throw new Error('Failed to fetch articles');
    const json: StrapiResponse<StrapiArticle[]> = await res.json();
    const articles = json.data ?? [];
    const meta = json.meta?.pagination ?? {};
    const total = meta.total ?? 0;
    const pageCount = meta.pageCount ?? 1;

    return {
      articles,
      pagination: {
        total,
        totalPages: pageCount,
        page,
        pageSize,
        hasNext: page < pageCount,
        hasPrev: page > 1,
      },
    };
  } catch (e) {
    console.error('fetchArticlesForBlog:', e);
    return { 
      articles: [], 
      pagination: { 
        total: 0, 
        totalPages: 0, 
        page: 1, 
        pageSize, 
        hasNext: false, 
        hasPrev: false 
      } 
    };
  }
}

/**
 * Server-side: fetch a single article by slug.
 * Use in Server Components only.
 */
export async function fetchArticleBySlugServer(slug: string | null | undefined): Promise<StrapiArticle | null> {
  if (!slug) return null;
  const base = STRAPI_API_URL.replace(/\/$/, '');
  try {
    const res = await fetch(
      `${base}/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`,
      { 
        next: { revalidate: 60 } // Revalidate every 60 seconds
      }
    );
    if (!res.ok) throw new Error('Failed to fetch article');
    const json: StrapiResponse<StrapiArticle[]> = await res.json();
    const list = json.data ?? [];
    return list.length ? list[0] : null;
  } catch (e) {
    console.error('fetchArticleBySlugServer:', e);
    return null;
  }
}

/**
 * Fetch summaries from Strapi with client-side caching
 * Sorted by publishAt descending (most recent first)
 */
export async function getSummaries(): Promise<StrapiSummary[]> {
  // Check cache first
  const cachedSummaries = getCachedData<StrapiSummary[]>(CACHE_KEYS.SUMMARIES);
  if (cachedSummaries) {
    console.log('Using cached summaries');
    return cachedSummaries;
  }
  
  try {
    console.log('Fetching fresh summaries from API');
    // Sort by publishAt descending, or createdAt if publishAt is not available
    const response = await fetch(`${STRAPI_API_URL}/summaries?populate=*&sort=publishAt:desc`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch summaries');
    }
    
    const data: StrapiResponse<StrapiSummary[]> = await response.json();
    const summaries = data.data || [];
    
    // Cache the summaries
    setCachedData(CACHE_KEYS.SUMMARIES, summaries);
    
    return summaries;
  } catch (error) {
    console.error('Error fetching summaries:', error);
    
    // If fetch fails, try to return stale cache if available
    if (isBrowser) {
      try {
        const staleCache = localStorage.getItem(CACHE_KEYS.SUMMARIES);
        if (staleCache) {
          const { data }: CacheEntry<StrapiSummary[]> = JSON.parse(staleCache);
          console.log('Using stale cache due to fetch error');
          return data;
        }
      } catch (e) {
        // Ignore stale cache errors
      }
    }
    
    return [];
  }
}

/**
 * Fetch a single summary by documentId with client-side caching
 */
export async function getSummaryByDocumentId(documentId: string): Promise<StrapiSummary | null> {
  if (!documentId) return null;
  
  const cacheKey = `${CACHE_KEYS.ARTICLE_PREFIX}summary_${documentId}`;
  
  // Check cache first
  const cachedSummary = getCachedData<StrapiSummary>(cacheKey);
  if (cachedSummary) {
    console.log(`Using cached summary: ${documentId}`);
    return cachedSummary;
  }
  
  try {
    console.log(`Fetching fresh summary from API: ${documentId}`);
    // Use documentId in the URL - Strapi might need a filter or different endpoint
    // Try filtering by documentId first
    const response = await fetch(
      `${STRAPI_API_URL}/summaries?filters[documentId][$eq]=${encodeURIComponent(documentId)}&populate=*`,
      {
        cache: 'no-store',
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch summary');
    }
    
    const data: StrapiResponse<StrapiSummary[]> = await response.json();
    const summary = data.data && data.data.length > 0 ? data.data[0] : null;
    
    if (summary) {
      // Cache the summary
      setCachedData(cacheKey, summary);
    }
    
    return summary || null;
  } catch (error) {
    console.error('Error fetching summary:', error);
    
    // If fetch fails, try to return stale cache if available
    if (isBrowser) {
      try {
        const staleCache = localStorage.getItem(cacheKey);
        if (staleCache) {
          const { data }: CacheEntry<StrapiSummary> = JSON.parse(staleCache);
          console.log(`Using stale cache for summary: ${documentId}`);
          return data;
        }
      } catch (e) {
        // Ignore stale cache errors
      }
    }
    
    return null;
  }
}

/**
 * Server-side: fetch a single summary by documentId.
 * Use in Server Components only.
 */
export async function fetchSummaryByDocumentIdServer(documentId: string | null | undefined): Promise<StrapiSummary | null> {
  if (!documentId) return null;
  const base = STRAPI_API_URL.replace(/\/$/, '');
  try {
    // Filter by documentId
    const res = await fetch(
      `${base}/summaries?filters[documentId][$eq]=${encodeURIComponent(documentId)}&populate=*`,
      { 
        next: { revalidate: 60 } // Revalidate every 60 seconds
      }
    );
    if (!res.ok) throw new Error('Failed to fetch summary');
    const json: StrapiResponse<StrapiSummary[]> = await res.json();
    return json.data && json.data.length > 0 ? json.data[0] : null;
  } catch (e) {
    console.error('fetchSummaryByDocumentIdServer:', e);
    return null;
  }
}
