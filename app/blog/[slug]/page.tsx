import Breadcrumbs from '../../components/Breadcrumbs';
import BlogDetailContent from '../components/BlogDetailContent';
import BlogSidebar from '../components/BlogSidebar';
// import { getBlogPostBySlug } from '@/lib/blogPosts';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = { title: '', content: '', image: '', author: '', date: '', comments: 0 }; // await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Breadcrumbs title={post.title} />
      <div className="back__blog__area back-blog-page back-blog-page-single pt-70 pb-60">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <BlogDetailContent post={post} />
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

