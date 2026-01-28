import Breadcrumbs from '@/app/components/Breadcrumbs';
import BlogDetailContent from '../../components/BlogDetailContent';
import BlogSidebar from '../../components/BlogSidebar';
import { fetchArticleBySlugServer } from '@/lib/strapi';
import { mapStrapiArticleToBlogPost } from '@/lib/blog';
import { fetchArticlesForBlog } from '@/lib/strapi';
import { notFound } from 'next/navigation';

// Generate static params for static export (S3)
export async function generateStaticParams() {
  try {
    const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://brilliant-dream-c3f2fe8788.strapiapp.com/api';
    const res = await fetch(`${STRAPI_API_URL}/articles?fields[0]=slug&pagination[limit]=1000`, {
      next: { revalidate: 3600 },
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

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailRightPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await fetchArticleBySlugServer(slug);
  if (!article) notFound();

  const post = mapStrapiArticleToBlogPost(article);
  const { articles } = await fetchArticlesForBlog(1, 20, '');
  const relatedPosts = articles
    .filter((a: any) => a.id !== article.id && a.slug !== slug)
    .slice(0, 4)
    .map((a: any) => mapStrapiArticleToBlogPost(a));

  return (
    <>
      <Breadcrumbs title={post.title} />
      <div className="back__blog__area back-blog-page back-blog-page-single pt-70 pb-60">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <BlogDetailContent post={post} relatedPosts={relatedPosts} />
            </div>
            <div className="col-lg-4">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
