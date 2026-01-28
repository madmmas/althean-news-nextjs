import BlogDetailPageContent from '../components/BlogDetailPageContent';

// Note: BlogDetailPageContent is a client component that fetches on the client side
// This works for both static export (S3) and dynamic rendering (Vercel)
// Content is fully dynamic and updates without rebuilding
// generateStaticParams is kept for static export compatibility (pre-generates HTML structure)
export async function generateStaticParams() {
  try {
    const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://brilliant-dream-c3f2fe8788.strapiapp.com/api';
    const res = await fetch(`${STRAPI_API_URL}/articles?fields[0]=slug&pagination[limit]=1000`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    
    if (!res.ok) {
      console.warn('Failed to fetch articles for generateStaticParams');
      return [];
    }
    
    const json = await res.json();
    const articles = json.data || [];
    return articles.map((article: any) => ({
      slug: article.slug || String(article.id),
    }));
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    return [];
  }
}

export default function BlogDetailPage() {
  return <BlogDetailPageContent layout="default" />;
}
