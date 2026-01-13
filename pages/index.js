import { useState, useEffect } from "react";
import Head from "next/head";
import BlogCard from "../components/BlogCard";
import { getArticles, getCacheInfo } from "../lib/strapi";
import Skeleton from "../components/Skeleton";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Check if we have cached data first
        const cacheInfo = getCacheInfo();
        const hasCachedData = cacheInfo && cacheInfo.hasCache;
        
        // If we have cached data, show it immediately (no loading state)
        if (hasCachedData) {
          const cachedArticles = await getArticles();
          setBlogs(cachedArticles);
          setError(null);
          setLoading(false);
          
          // Refresh in background if cache is about to expire (less than 1 minute left)
          if (cacheInfo.remaining < 60 * 1000) {
            // Refresh in background without showing loading
            getArticles().then(articles => {
              setBlogs(articles);
            }).catch(err => {
              console.error("Background refresh failed:", err);
            });
          }
        } else {
          // No cache, show loading and fetch
          setLoading(true);
          const articles = await getArticles();
          setBlogs(articles);
          setError(null);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load articles. Please try again later.");
        setLoading(false);
      }
    };

    fetchBlogs();
    
    // Set up periodic refresh every 5 minutes
    const refreshInterval = setInterval(() => {
      getArticles().then(articles => {
        setBlogs(articles);
      }).catch(err => {
        console.error("Periodic refresh failed:", err);
      });
    }, 5 * 60 * 1000); // 5 minutes
    
    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <>
      <Head>
        <title>আলথিয়ান নিউজ | বাংলা নিউজ</title>
        <meta name="description" content="আলথিয়ান নিউজ - আপনার বিশ্বস্ত বাংলা নিউজ সোর্স" />
      </Head>

      <main id="journal">
        <div className="spacer">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1">
                <div className="page-intro mar-top-lg">
                  <h1 className="page-title bangla">আলথিয়ান নিউজ</h1>
                  <p className="bangla">আপনার বিশ্বস্ত বাংলা নিউজ সোর্স</p>
                </div>
              </div>
            </div>
            <div className="articles-list mar-top-lg">
              {loading ? (
                <div className="grids">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} />
                  ))}
                </div>
              ) : error ? (
                <div className="text-center">
                  <p className="bangla">{error}</p>
                </div>
              ) : blogs.length === 0 ? (
                <div className="text-center">
                  <p className="bangla">কোন নিবন্ধ পাওয়া যায়নি</p>
                </div>
              ) : (
                <div className="grids">
                  {blogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Blog;
