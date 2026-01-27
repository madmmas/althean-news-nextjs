import Link from 'next/link';
import Image from 'next/image';
import { withBasePath } from '@/lib/basePath';
import { BlogPost } from '@/lib/blogPosts';

interface BlogContentProps {
  posts: BlogPost[];
}

export default function BlogContent({ posts }: BlogContentProps) {
  const blogPosts = posts;
  return (
    <div className="blog-grid">
      {blogPosts.map((post) => {
        const postUrl = post.slug ? `/blog/${post.slug}` : '#';
        return (
          <div key={post.id} className="single-blog">
            <div className="inner-blog">
              <div className="blog-img">
                <Link href={postUrl}>
                  <Image src={withBasePath(post.image)} alt="Blog Image"
                  width={800}
                  height={600}
                />
                </Link>
              </div>
              <div className="blog-content">
                <ul className="top-part">
                  <li>
                    <Image src={withBasePath(post.authorImage)} alt="image"
                  width={800}
                  height={600}
                /> {post.author}
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
                    </svg> {post.comments}
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
      <blockquote>So I said tosser boot twit lurgy eaton bloke public school arse bleeding chimney pot lost. <em>Hanson Deck</em></blockquote>
      <blockquote className="block__link_q">What a plonker the full monty it&apos;s your round matie boy jolly good my lady Jeffrey pukka hunky.</blockquote>
    </div>
  );
}

