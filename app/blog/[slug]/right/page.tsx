import Breadcrumbs from '@/app/components/Breadcrumbs';
import BlogDetailContent from '../../components/BlogDetailContent';
import BlogSidebar from '../../components/BlogSidebar';
import { fetchArticleBySlugServer } from '@/lib/strapi';
import { mapStrapiArticleToBlogPost } from '@/lib/blog';
import { fetchArticlesForBlog } from '@/lib/strapi';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

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
