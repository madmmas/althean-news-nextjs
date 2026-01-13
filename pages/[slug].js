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

  const attributes = blog.attributes || blog;
  const { title, description, content, publishedAt, thumbnail } = attributes;
  
  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("bn-BD", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const imageUrl = getStrapiImageUrl(thumbnail, true); // Always use placeholder if no image

  // Render Strapi rich text content
  const renderContent = (content) => {
    if (!content) return null;

    // If content is a string (HTML), render it directly
    if (typeof content === "string") {
      return (
        <div
          className="article-content bangla"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );
    }

    // If content is an array (Strapi blocks), render each block
    if (Array.isArray(content)) {
      return content.map((block, index) => {
        if (block.type === "paragraph") {
          return (
            <p key={index} className="bangla">
              {block.children?.map((child, childIndex) => {
                if (child.type === "text") {
                  return <span key={childIndex}>{child.text}</span>;
                }
                return null;
              })}
            </p>
          );
        }
        if (block.type === "heading") {
          const HeadingTag = `h${block.level || 2}`;
          return (
            <HeadingTag key={index} className="bangla">
              {block.children?.map((child, childIndex) => {
                if (child.type === "text") {
                  return <span key={childIndex}>{child.text}</span>;
                }
                return null;
              })}
            </HeadingTag>
          );
        }
        if (block.type === "image") {
          const imgUrl = getStrapiImageUrl(block.image, true); // Use placeholder if no image
          return (
            <div key={index} className="article-content-image">
              <Image
                src={imgUrl}
                width={800}
                height={600}
                alt={block.caption || title || 'Article Image'}
              />
            </div>
          );
        }
        return null;
      });
    }

    return null;
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
                  {renderContent(content)}
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
