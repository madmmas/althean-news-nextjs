'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { withBasePath } from '@/lib/basePath';
import Link from 'next/link';
import BlogPagination from '../../components/BlogPagination';
import BlogContent from './BlogContent';
import BlogSearchForm from './BlogSearchForm';
import { getArticles } from '@/lib/strapi';
import { mapStrapiArticleToBlogPost } from '@/lib/blog';

const latestNewsPlaceholder = [
  { image: "/assets/images/dont/1.jpg", category: "Politics", title: "Time can never stop for anyone", author: "Jon Deo", slug: "/blog" },
  { image: "/assets/images/dont/2.jpg", category: "Music", title: "Everyone loves to listen to music", author: "Jon Deo", slug: "/blog" },
  { image: "/assets/images/dont/3.jpg", category: "Lifestyle", title: "10 easy habits to make your life", author: "Jon Deo", slug: "/blog" },
  { image: "/assets/images/dont/4.jpg", category: "Travel", title: "World tranding best 10 website", author: "Jon Deo", slug: "/blog" },
];

const recentComments = [
  { image: "/assets/images/author/1.jpg", name: "John Doe", date: "14 January, 2022", text: "Having no content in  post should have adverse.." },
  { image: "/assets/images/author/2.jpg", name: "Jane Smith", date: "15 January, 2022", text: "Great article! Thanks for sharing this..." },
  { image: "/assets/images/author/3.jpg", name: "Mike Johnson", date: "16 January, 2022", text: "I found this very helpful and informative." },
];

function BlogPageContentInner() {
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

  const latestNews = blogPosts.length > 0
    ? blogPosts.slice(0, 4).map((p) => ({
        image: p.image,
        category: p.category ?? "Uncategorized",
        title: p.title,
        author: p.author,
        slug: `/blog/${p.slug}`,
      }))
    : latestNewsPlaceholder;

  return (
    <>
      <div className="back__blog__area back-blog-page pt-70 pb-60">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
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
            <div className="col-lg-4">
              <div className="back-sidebar pl-30 md-pl-0 back-hero-area back-latest-posts back-whats-posts">
                <BlogSearchForm />
                <div className="back-title back-small-title">
                  <h2>Get in Touch</h2>
                </div>
                <ul className="social-area">
                  <li>
                    <div>
                      <a href="#">
                        <i className="fa-brands fa-facebook-f"></i>
                      </a>{" "}
                      <span>
                        Followers <em>750</em>
                      </span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <a href="#">
                        <i className="fa-brands fa-twitter"></i>
                      </a>{" "}
                      <span>
                        Fans <em>1236</em>
                      </span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <a href="#">
                        <i className="fa-brands fa-instagram"></i>
                      </a>{" "}
                      <span>
                        Likes <em>523</em>
                      </span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <a href="#">
                        <i className="fa-brands fa-vimeo-v"></i>
                      </a>{" "}
                      <span>
                        Comments <em>790</em>
                      </span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <a href="#">
                        <i className="fa-brands fa-linkedin-in"></i>
                      </a>{" "}
                      <span>
                        Followers <em>1025</em>
                      </span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <a href="#">
                        <i className="fa-brands fa-youtube"></i>
                      </a>{" "}
                      <span>
                        Subscribers <em>590M</em>
                      </span>
                    </div>
                  </li>
                </ul>
                <div className="back-title back-small-title pt-30">
                  <h2>Latest News</h2>
                </div>
                <ul className="back-hero-bottom">
                  {latestNews.map((news, index) => (
                    <li key={index}>
                      <div className="image-areas">
                        <Link href={news.slug}>
                          <Image
                            src={news.image.startsWith("http") || news.image.startsWith("data:") ? news.image : withBasePath(news.image)}
                            alt={news.title}
                            width={800}
                            height={600}
                          />
                        </Link>
                      </div>
                      <div className="back-btm-content">
                        <Link
                          href={`/categories/${news.category
                            .toLowerCase()
                            .replace(/\s+/g, "-")
                            .replace(/&/g, "and")}`}
                          className="back-cates"
                        >
                          {news.category}
                        </Link>
                        <h3>
                          <Link href={news.slug}>{news.title}</Link>
                        </h3>
                        <ul>
                          <li className="back-date">
                            by <Link href={news.slug}>{news.author}</Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="back-add pt-15">
                  <Image src={withBasePath("/assets/images/whats/add.jpg")}
                    alt="add-image"
                  width={800}
                  height={600}
                />
                </div>
                <div className="back-title back-small-title pt-50">
                  <h2>Follow Us</h2>
                </div>
                <ul className="back-instragram">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <li key={num}>
                      <a href="#">
                        <Image src={withBasePath(
                            `/assets/images/instragram/${num}.jpg`
                          )}
                          alt="image"
                  width={800}
                  height={600}
                />
                        <i className="fa-brands fa-instagram"></i>
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="back-title back-small-title pt-50">
                  <h2>Comments</h2>
                </div>
                <div className="widget back-recent-comments">
                  <ul className="recent-comments">
                    {recentComments.map((comment, index) => (
                      <li key={index}>
                        <span className="post-images">
                          <Image src={withBasePath(comment.image)} alt="post"
                  width={800}
                  height={600}
                />
                        </span>
                        <div className="titles">
                          <h4>{comment.name}</h4>
                          <span>{comment.date}</span>
                          <p>{comment.text}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function BlogPageContent() {
  return (
    <Suspense fallback={
      <div className="back__blog__area back-blog-page pt-70 pb-60">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <p>Loading...</p>
            </div>
          </div>
        </div>
      </div>
    }>
      <BlogPageContentInner />
    </Suspense>
  );
}
