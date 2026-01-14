const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://brilliant-dream-c3f2fe8788.strapiapp.com/api';

// Cache configuration - 5 minutes cache duration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
const CACHE_KEYS = {
  ARTICLES: 'strapi_articles_cache',
  ARTICLE_PREFIX: 'strapi_article_',
};

/**
 * Check if we're in the browser environment
 */
const isBrowser = typeof window !== 'undefined';

/**
 * Get cached data with expiration check
 */
function getCachedData(key) {
  if (!isBrowser) return null;
  
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    
    const { data, timestamp } = JSON.parse(cached);
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
function setCachedData(key, data) {
  if (!isBrowser) return;
  
  try {
    const cacheObject = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(cacheObject));
  } catch (error) {
    console.error('Error setting cache:', error);
    // If storage is full, try to clear old cache
    if (error.name === 'QuotaExceededError') {
      clearExpiredCache();
      try {
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
function clearExpiredCache() {
  if (!isBrowser) return;
  
  try {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('strapi_')) {
        try {
          const cached = localStorage.getItem(key);
          if (cached) {
            const { timestamp } = JSON.parse(cached);
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
export async function getArticles() {
  // Check cache first
  const cachedArticles = getCachedData(CACHE_KEYS.ARTICLES);
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
    
    const data = await response.json();
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
          const { data } = JSON.parse(staleCache);
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
export async function getArticleBySlug(slug) {
  if (!slug) return null;
  
  const cacheKey = `${CACHE_KEYS.ARTICLE_PREFIX}${slug}`;
  
  // Check cache first
  const cachedArticle = getCachedData(cacheKey);
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
    
    const data = await response.json();
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
          const { data } = JSON.parse(staleCache);
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
export function clearArticlesCache() {
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
export function getCacheInfo() {
  if (!isBrowser) return null;
  
  try {
    const articlesCache = localStorage.getItem(CACHE_KEYS.ARTICLES);
    if (articlesCache) {
      const { timestamp } = JSON.parse(articlesCache);
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
export function getPlaceholderImageUrl(width = 800, height = 600) {
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
export function getStrapiImageUrl(image, usePlaceholder = true) {
  let imageUrl = null;
  
  if (image) {
    // Handle cover object directly (Strapi v4 format from your API)
    if (image.url) {
      // Direct URL in cover object
      imageUrl = image.url.startsWith('http') ? image.url : `${STRAPI_API_URL.replace('/api', '')}${image.url}`;
    }
    // Handle cover.formats (prefer large, then medium, then small, then thumbnail)
    else if (image.formats) {
      if (image.formats.large && image.formats.large.url) {
        imageUrl = image.formats.large.url;
      } else if (image.formats.medium && image.formats.medium.url) {
        imageUrl = image.formats.medium.url;
      } else if (image.formats.small && image.formats.small.url) {
        imageUrl = image.formats.small.url;
      } else if (image.formats.thumbnail && image.formats.thumbnail.url) {
        imageUrl = image.formats.thumbnail.url;
      }
    }
    // Handle cover.url directly (if cover is passed as the image parameter)
    else if (image.cover && image.cover.url) {
      const url = image.cover.url;
      imageUrl = url.startsWith('http') ? url : `${STRAPI_API_URL.replace('/api', '')}${url}`;
    }
    // Handle cover.formats
    else if (image.cover && image.cover.formats) {
      if (image.cover.formats.large && image.cover.formats.large.url) {
        imageUrl = image.cover.formats.large.url;
      } else if (image.cover.formats.medium && image.cover.formats.medium.url) {
        imageUrl = image.cover.formats.medium.url;
      } else if (image.cover.formats.small && image.cover.formats.small.url) {
        imageUrl = image.cover.formats.small.url;
      } else if (image.cover.formats.thumbnail && image.cover.formats.thumbnail.url) {
        imageUrl = image.cover.formats.thumbnail.url;
      }
    }
    // Handle string URL
    else if (typeof image === 'string') {
      imageUrl = image.startsWith('http') ? image : `${STRAPI_API_URL.replace('/api', '')}${image}`;
    }
    // Handle nested structures (legacy support)
    else if (image.data && image.data.attributes) {
      const url = image.data.attributes.url;
      imageUrl = url.startsWith('http') ? url : `${STRAPI_API_URL.replace('/api', '')}${url}`;
    } else if (image.attributes) {
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
