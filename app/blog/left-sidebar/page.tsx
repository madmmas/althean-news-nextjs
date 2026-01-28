import Breadcrumbs from '../../components/Breadcrumbs';
import BlogContent from '../components/BlogContent';
import BlogSidebar from '../components/BlogSidebar';
// import { getBlogPosts } from '@/lib/blogPosts';
import BlogPagination from '../../components/BlogPagination';

interface BlogLeftSidebarPageProps {
  searchParams: Promise<{ page?: string; q?: string }>;
}

export default async function BlogLeftSidebarPage({ searchParams }: BlogLeftSidebarPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const searchQuery = params.q || '';
  const { posts, pagination } = { posts: [], pagination: { total: 0 } }; // await getBlogPosts(page, 4, searchQuery);

  return (
    <>
      <Breadcrumbs title="Blog Left Sidebar" />
      <div className="back__blog__area back-blog-page pt-70 pb-60">
        <div className="container">
          <div className="row flex-row-reverse">
            <div className="col-lg-8">
              {searchQuery && (
                <div className="mb-30">
                  <h3>Search Results for &quot;{searchQuery}&quot;</h3>
                  <p className="text-muted">Found {pagination.total} result{pagination.total !== 1 ? 's' : ''}</p>
                </div>
              )}
              {posts.length === 0 ? (
                <div className="col-12">
                  <p>
                    {searchQuery
                      ? `No posts found matching "${searchQuery}". Please try a different search term.`
                      : 'No posts found. Please run the seed migration: npm run db:seed'}
                  </p>
                </div>
              ) : (
                <>
                  <BlogContent posts={posts} />
                  <BlogPagination pagination={pagination} />
                </>
              )}
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

