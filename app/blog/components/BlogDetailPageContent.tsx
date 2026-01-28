'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import BlogDetailContent from './BlogDetailContent';
import BlogSidebar from './BlogSidebar';
import { getArticleBySlug, getArticles } from '@/lib/strapi';
import { mapStrapiArticleToBlogPost } from '@/lib/blog';

interface BlogDetailPageContentProps {
  layout?: 'default' | 'full' | 'left' | 'right';
  showBreadcrumbs?: boolean;
}

export default function BlogDetailPageContent({ layout = 'default', showBreadcrumbs = true }: BlogDetailPageContentProps) {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!slug) {
        setError('No slug provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch the main article
        const article = await getArticleBySlug(slug);
        if (!article) {
          setError('Article not found');
          setLoading(false);
          return;
        }

        const mappedPost = mapStrapiArticleToBlogPost(article);
        setPost(mappedPost);

        // Fetch related articles
        const allArticles = await getArticles();
        const related = allArticles
          .filter((a: any) => a.id !== article.id && a.slug !== slug)
          .slice(0, 4)
          .map((a: any) => mapStrapiArticleToBlogPost(a));
        setRelatedPosts(related);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <>
        {showBreadcrumbs && <Breadcrumbs title="Loading..." />}
        <div className="back__blog__area back-blog-page back-blog-page-single pt-70 pb-60">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <p>Loading article...</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        {showBreadcrumbs && <Breadcrumbs title="Article Not Found" />}
        <div className="back__blog__area back-blog-page back-blog-page-single pt-70 pb-60">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <p>{error || 'Article not found'}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Render based on layout
  if (layout === 'full') {
    return (
      <>
        {showBreadcrumbs && <Breadcrumbs title={post.title} />}
        <div className="back__blog__area back-blog-page back-blog-page-single pt-70 pb-60">
          <div className="container back-max1100">
            <div className="row">
              <div className="col-lg-12">
                <BlogDetailContent post={post} relatedPosts={relatedPosts} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (layout === 'left') {
    return (
      <>
        {showBreadcrumbs && <Breadcrumbs title={post.title} />}
        <div className="back__blog__area back-blog-page back-blog-page-single pt-70 pb-60">
          <div className="container">
            <div className="row flex-row-reverse">
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

  if (layout === 'right') {
    return (
      <>
        {showBreadcrumbs && <Breadcrumbs title={post.title} />}
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

  // Default layout (right sidebar)
  return (
    <>
      {showBreadcrumbs && <Breadcrumbs title={post.title} />}
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
