'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import BlogContent from './BlogContent';
import BlogPagination from '../../components/BlogPagination';
import { getArticles } from '@/lib/strapi';
import { mapStrapiArticleToBlogPost } from '@/lib/blog';

function BlogPageContentFullwidthInner() {
  const searchParams = useSearchParams();
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const searchQuery = searchParams.get('q') || '';
  const pageSize = 8;

  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 0, page: 1, pageSize: 8, hasNext: false, hasPrev: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const allArticles = await getArticles();
        
        // Filter by search query if provided
        let filtered = allArticles;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          filtered = allArticles.filter((article: any) => {
            const title = (article.title || '').toLowerCase();
            const desc = (article.description || '').toLowerCase();
            return title.includes(q) || desc.includes(q);
          });
        }

        // Calculate pagination
        const total = filtered.length;
        const totalPages = Math.ceil(total / pageSize);
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const paginated = filtered.slice(start, end);

        const posts = paginated.map(mapStrapiArticleToBlogPost);
        setBlogPosts(posts);
        setPagination({
          total,
          totalPages,
          page,
          pageSize,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        });
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setBlogPosts([]);
        setPagination({ total: 0, totalPages: 0, page: 1, pageSize: 8, hasNext: false, hasPrev: false });
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [page, searchQuery]);

  return (
    <div className="back__blog__area back-blog-page back-blog-page-full pt-70 pb-60">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {searchQuery && (
              <div className="mb-30">
                <h3>Search Results for &quot;{searchQuery}&quot;</h3>
                <p className="text-muted">
                  Found {pagination.total} result
                  {pagination.total !== 1 ? "s" : ""}
                </p>
              </div>
            )}
            {loading ? (
              <div className="col-12">
                <p>Loading posts...</p>
              </div>
            ) : blogPosts.length === 0 ? (
              <div className="col-12">
                <p>
                  {searchQuery
                    ? `No posts found matching "${searchQuery}". Please try a different search term.`
                    : "No posts found yet."}
                </p>
              </div>
            ) : (
              <>
                <BlogContent posts={blogPosts} />
                <BlogPagination pagination={pagination} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BlogPageContentFullwidth() {
  return (
    <Suspense fallback={
      <div className="back__blog__area back-blog-page back-blog-page-full pt-70 pb-60">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <p>Loading...</p>
            </div>
          </div>
        </div>
      </div>
    }>
      <BlogPageContentFullwidthInner />
    </Suspense>
  );
}
