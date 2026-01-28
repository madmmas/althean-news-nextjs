import { withBasePath } from '@/lib/basePath';
import { getStrapiImageUrl, type StrapiArticle } from '@/lib/strapi';

export interface BlogPost {
  id: number | string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  authorImage: string;
  date: string;
  comments?: number | string;
  category?: string;
  categorySlug?: string;
  content?: string;
}

function formatDate(dateInput: string | null | undefined): string {
  if (!dateInput) return '';
  try {
    const d = new Date(dateInput);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return '';
  }
}

// Type guard to check if category is an object
function isCategoryObject(category: string | { id?: number; name?: string; slug?: string; } | undefined): category is { id?: number; name?: string; slug?: string; } {
  return typeof category === 'object' && category !== null;
}

export function mapStrapiArticleToBlogPost(article: StrapiArticle): BlogPost {
  // Handle category - can be string or object
  let category: string;
  let categorySlug: string;
  
  if (typeof article.category === 'string') {
    category = article.category;
    categorySlug = category.toLowerCase().replace(/\s+/g, '-');
  } else if (isCategoryObject(article.category)) {
    category = article.category.name ?? 'Uncategorized';
    categorySlug = article.category.slug ?? category.toLowerCase().replace(/\s+/g, '-');
  } else {
    category = 'Uncategorized';
    categorySlug = 'uncategorized';
  }
  
  const imageUrl = getStrapiImageUrl(article.cover ?? article.thumbnail) ?? withBasePath('/assets/images/blog-grid/1.jpg');
  const authorName = article.author?.name ?? article.author?.username ?? 'Admin';
  const authorImage = getStrapiImageUrl(article.author?.avatar) ?? withBasePath('/assets/images/author/1.jpg');
  let excerpt = article.description ?? article.excerpt ?? '';
  if (!excerpt && typeof article.content === 'string') {
    const plain = article.content.replace(/<[^>]+>/g, '').trim();
    excerpt = plain.slice(0, 160) + (plain.length > 160 ? '...' : '');
  }
  const content = typeof article.content === 'string' ? article.content : '';

  return {
    id: article.id,
    slug: article.slug ?? String(article.id),
    title: article.title ?? 'Untitled',
    excerpt: excerpt || 'No description.',
    image: imageUrl,
    author: authorName,
    authorImage,
    date: formatDate(article.publishedAt ?? article.createdAt),
    comments: article.comments?.length ?? 0,
    category,
    categorySlug,
    content: content || excerpt,
  };
}
