import Link from "next/link";
import Image from "next/image";
import { getStrapiImageUrl } from "../lib/strapi";

const BlogCard = ({ blog }) => {
  // Strapi data structure: data is directly on blog object (not wrapped in attributes)
  const article = blog.attributes || blog;
  const { cover, thumbnail, title, description, publishedAt, slug } = article;
  
  // Use cover if available, otherwise fallback to thumbnail
  const imageField = cover || thumbnail;
  const imageUrl = getStrapiImageUrl(imageField, true); // Always use placeholder if no image
  const formattedDate = publishedAt 
    ? new Date(publishedAt).toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : '';

  return (
    <article>
      <Link href={`/${slug}`}>
        <div className="article-image">
          <div className="icon-arrow"></div>
          <Image
            src={imageUrl}
            width={800}
            height={600}
            alt={title || 'Article Image'}
            className="bangla"
          />
        </div>
        <div className="article-text">
          <h4 className="title bangla">{title}</h4>
          <p className="bangla">{description}</p>
          <span className="time">{formattedDate}</span>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;
