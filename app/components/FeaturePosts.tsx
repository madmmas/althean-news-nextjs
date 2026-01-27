import Image from 'next/image';
import { withBasePath } from "@/lib/basePath";
import Link from "next/link";
import { getStrapiImageUrl } from "@/lib/strapi";

// Helper function to get category class based on category name
function getCategoryClass(categoryName: string): string {
  const categoryMap: { [key: string]: string } = {
    'travel': 'back-cate back-tra',
    'technology': 'back-cate back-tech2',
    'tech': 'back-cate back-tech2',
    'environment': 'back-cate back-tech',
    'adventure': 'back-cate back-fashion',
    'politics': 'back-cate back-poli',
    'fashion': 'back-cate back-fashion',
    'lifestyle': 'back-cate back-fashion',
    'health': 'back-cate back-tech',
    'sports': 'back-cate back-poli',
  };
  
  const normalized = categoryName?.toLowerCase() || '';
  return categoryMap[normalized] || 'back-cate back-tra';
}

// Helper function to format date
function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    return '';
  }
}

// Server-side function to fetch articles
async function fetchArticles() {
  const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://brilliant-dream-c3f2fe8788.strapiapp.com/api';
  
  try {
    const response = await fetch(`${STRAPI_API_URL}/articles?populate=*&sort=publishedAt:desc`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }
    
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export default async function FeaturePosts() {
  // Fetch articles from Strapi (server-side)
  const articles = await fetchArticles();
  
  // Get first 5 articles for feature posts
  const featurePosts = articles.slice(0, 5).map((article: any) => {
    const category = article.category?.name || article.category || 'Uncategorized';
    const categorySlug = article.category?.slug || category.toLowerCase().replace(/\s+/g, '-');
    const imageUrl = getStrapiImageUrl(article.cover || article.thumbnail) || withBasePath("/assets/images/feature/1.jpg");
    const authorName = article.author?.name || article.author?.username || 'Admin';
    const authorImage = getStrapiImageUrl(article.author?.avatar) || withBasePath("/assets/images/author/1.jpg");
    
    return {
      id: article.id,
      slug: article.slug,
      image: imageUrl,
      categoryClass: getCategoryClass(category),
      category: category,
      categorySlug: categorySlug,
      title: article.title || 'Untitled',
      excerpt: article.description || article.excerpt || article.content?.substring(0, 100) + '...' || '',
      date: formatDate(article.publishedAt || article.createdAt),
      authorName: authorName,
      authorImage: authorImage,
    };
  });

  // Get unique categories with counts for the sidebar
  const categoryCounts: { [key: string]: number } = {};
  articles.forEach((article: any) => {
    const category = article.category?.name || article.category || 'Uncategorized';
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  });

  const categories = Object.entries(categoryCounts)
    .slice(0, 6)
    .map(([label, total], index) => ({
      image: withBasePath(`/assets/images/category/${(index % 6) + 1}.jpg`),
      total: total.toString(),
      label: label,
      slug: label.toLowerCase().replace(/\s+/g, '-'),
    }));

  // Get most read articles (first 4 articles)
  const mostRead = articles.slice(0, 4).map((article: any) => {
    const category = article.category?.name || article.category || 'Uncategorized';
    const imageUrl = getStrapiImageUrl(article.cover || article.thumbnail) || withBasePath("/assets/images/read/1.jpg");
    
    return {
      id: article.id,
      slug: article.slug,
      image: imageUrl,
      category: category,
      title: article.title || 'Untitled',
    };
  });

  return (
    <div className="back-hero-area back-latest-posts back-whats-posts back-feature-posts">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 md-pb-70">
            <div className="back-title">
              <h2>Feature Posts</h2>
            </div>
            <ul className="back-hero-bottom back-hero-bottom2">
              {featurePosts.length > 0 ? (
                featurePosts.map((post) => (
                  <li key={post.id}>
                    <div className="image-areas">
                      <Link href={`/blog/${post.slug}`}>
                        <Image 
                          src={post.image} 
                          alt={post.title}
                          width={800}
                          height={600}
                        />
                      </Link>
                    </div>
                    <div className="back-btm-content">
                      <Link
                        href={`/categories/${post.categorySlug}`}
                        className={post.categoryClass}
                      >
                        {post.category}
                      </Link>
                      <h3>
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>
                      <p>{post.excerpt}</p>
                      <ul className="back-meta">
                        <li className="back-author">
                          <span>
                            <Image 
                              src={post.authorImage}
                              alt={post.authorName}
                              width={40}
                              height={40}
                            />
                          </span>
                          <Link href={`/author`}>by {post.authorName}</Link>
                        </li>
                        <li className="back-date">
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-clock"
                            >
                              <circle cx="12" cy="12" r="10"></circle>
                              <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                          </span>
                          {post.date}
                        </li>
                      </ul>
                    </div>
                  </li>
                ))
              ) : (
                <li>
                  <p>No feature posts available.</p>
                </li>
              )}
            </ul>
            <div className="text-center pt-73 md-pt-30">
              <Link href={`/blog`} className="back-btn">
                View All Posts
              </Link>
            </div>
          </div>
          <div className="col-lg-4 pl-30">
            <div className="back-title back-small-title">
              <h2>Categories</h2>
            </div>
            <ul className="back-category-area">
              {categories.map((item, index) => (
                <li key={index}>
                  <div>
                    <Image src={withBasePath(item.image)} alt="Category Image"
                  width={800}
                  height={600}
                />
                    <Link href={`/categories/${item.label.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")}`}>
                      <span>
                        <em>{item.total}</em> {item.label}
                      </span>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
            <div className="back-title back-small-title pt-30">
              <h2>Most Read</h2>
            </div>
            <ul className="back-hero-bottom">
              {mostRead.length > 0 ? (
                mostRead.map((item) => (
                  <li key={item.id}>
                    <div className="image-areas">
                      <Link href={`/blog/${item.slug}`}>
                        <Image 
                          src={item.image} 
                          alt={item.title}
                          width={800}
                          height={600}
                        />
                      </Link>
                    </div>
                    <div className="back-btm-content">
                      <Link
                        href={`/categories/${item.category
                          .toLowerCase()
                          .replace(/\s+/g, "-")
                          .replace(/&/g, "and")}`}
                        className="back-cates"
                      >
                        {item.category}
                      </Link>
                      <h3>
                        <Link href={`/blog/${item.slug}`}>
                          {item.title}
                        </Link>
                      </h3>
                    </div>
                  </li>
                ))
              ) : (
                <li>
                  <p>No articles available.</p>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
