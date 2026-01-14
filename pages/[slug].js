import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { getArticleBySlug, getStrapiImageUrl } from "../lib/strapi";
import Skeleton from "../components/Skeleton";

const BlogDetails = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchArticle = async () => {
      try {
        // getArticleBySlug already handles caching, but we check cache first for instant display
        let cachedArticle = null;
        if (typeof window !== 'undefined') {
          try {
            const cacheKey = `strapi_article_${slug}`;
            const cached = localStorage.getItem(cacheKey);
            if (cached) {
              const { data, timestamp } = JSON.parse(cached);
              const now = Date.now();
              const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
              
              // If cache is valid, use it immediately
              if (now - timestamp < CACHE_DURATION) {
                cachedArticle = data;
              }
            }
          } catch (e) {
            // Ignore cache read errors
          }
        }
        
        // Show cached data immediately if available
        if (cachedArticle) {
          setBlog(cachedArticle);
          setError(null);
          setLoading(false);
          
          // Refresh in background
          getArticleBySlug(slug).then(article => {
            if (article) setBlog(article);
          }).catch(err => {
            console.error("Background refresh failed:", err);
          });
        } else {
          // No cache, fetch normally
          setLoading(true);
          const article = await getArticleBySlug(slug);
          if (!article) {
            setError("Article not found");
            return;
          }
          setBlog(article);
          setError(null);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching article:", err);
        setError("Failed to load article. Please try again later.");
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return <Skeleton />;
  }

  if (error || !blog) {
    return (
      <>
        <Head>
          <title>Article Not Found | আলথিয়ান নিউজ</title>
        </Head>
        <main id="journal">
          <div className="spacer">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1">
                  <div className="mar-top-lg text-center">
                    <h2 className="bangla">নিবন্ধ পাওয়া যায়নি</h2>
                    <p className="bangla">{error || "এই নিবন্ধটি পাওয়া যায়নি"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  // Strapi data structure: data is directly on blog object (not wrapped in attributes)
  const article = blog.attributes || blog;
  const { title, description, blocks, publishedAt, cover, thumbnail } = article;
  
  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("bn-BD", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  // Use cover if available, otherwise fallback to thumbnail
  const imageField = cover || thumbnail;
  const imageUrl = getStrapiImageUrl(imageField, true); // Always use placeholder if no image

  // Render Strapi blocks content
  const renderContent = (blocks) => {
    if (!blocks || !Array.isArray(blocks)) return null;

    return blocks.map((block, index) => {
      // Handle shared.rich-text component
      if (block.__component === "shared.rich-text" && block.body) {
        return (
          <div
            key={index}
            className="article-content bangla"
            dangerouslySetInnerHTML={{ __html: block.body }}
          />
        );
      }
      
      // Handle shared.quote component
      if (block.__component === "shared.quote") {
        return (
          <blockquote key={index} className="bangla">
            {block.body && <p>{block.body}</p>}
            {block.title && <cite>— {block.title}</cite>}
          </blockquote>
        );
      }
      
      // Handle shared.media component
      if (block.__component === "shared.media" && block.file) {
        const imgUrl = getStrapiImageUrl(block.file, true);
        return (
          <div key={index} className="article-content-image">
            <Image
              src={imgUrl}
              width={800}
              height={600}
              alt={block.alternativeText || title || 'Article Image'}
            />
          </div>
        );
      }
      
      // Handle shared.slider component
      if (block.__component === "shared.slider" && block.files && Array.isArray(block.files)) {
        return (
          <div key={index} className="article-slider">
            {block.files.map((file, fileIndex) => {
              const imgUrl = getStrapiImageUrl(file, true);
              return (
                <div key={fileIndex} className="article-content-image">
                  <Image
                    src={imgUrl}
                    width={800}
                    height={600}
                    alt={file.alternativeText || title || 'Article Image'}
                  />
                </div>
              );
            })}
          </div>
        );
      }
      
      return null;
    });
  };

  return (
    <>
      <Head>
        <title>{title} | আলথিয়ান নিউজ</title>
        <meta name="description" content={description} />
        {imageUrl && <meta property="og:image" content={imageUrl} />}
      </Head>

      <main id="journal">
        <div className="spacer">
          <article className="single">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1">
                  <div className="mar-top-lg">
                    <span className="time">{formattedDate}</span>
                    <h2 className="article-title bangla">{title}</h2>
                    {description && <p className="bangla">{description}</p>}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1">
                  <div className="article-content-image mar-top-lg">
                    <Image
                      src={imageUrl}
                      width={800}
                      height={600}
                      alt={title || 'Article Image'}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1">
                  {renderContent(blocks)}
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>
    </>
  );
};

export default BlogDetails;
