import Link from 'next/link';
import Image from 'next/image';
import { withBasePath } from '@/lib/basePath';
import type { BlogPost } from '@/lib/blog';

interface BlogContentProps {
  posts: BlogPost[];
}

function imgSrc(src: string) {
  return src.startsWith('http') || src.startsWith('data:') ? src : withBasePath(src);
}

export default function BlogContent({ posts }: BlogContentProps) {
  return (
    <div className="blog-grid">
      {posts.map((post) => {
        const postUrl = post.slug ? `/blog/${post.slug}` : '#';
        return (
          <div key={post.id} className="single-blog">
            <div className="inner-blog">
              <div className="blog-img">
                <Link href={postUrl}>
                  <Image src={imgSrc(post.image)} alt={post.title} width={800} height={600} />
                </Link>
              </div>
              <div className="blog-content">
                <ul className="top-part">
                  <li>
                    <Image src={imgSrc(post.authorImage)} alt={post.author} width={40} height={40} /> {post.author}
                  </li>
                  <li className="date-part">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-clock">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg> {post.date}
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-message-circle">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg> {post.comments ?? 0}
                  </li>
                </ul>
                <h3 className="blog-title">
                  <Link href={postUrl}>{post.title}</Link>
                </h3>
                <p className="blog-desc">{post.excerpt}</p>
                <Link href={postUrl} className="back-btn-border">
                  Read More <i className="arrow_right"></i>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

