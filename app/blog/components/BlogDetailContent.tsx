'use client';

import Image from 'next/image';
import { withBasePath } from '@/lib/basePath';
import type { BlogPost } from '@/lib/blog';
import Link from 'next/link';
import CommentSection from './CommentSection';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface BlogDetailContentProps {
  post: BlogPost;
  relatedPosts?: BlogPost[];
}

function imgSrc(src: string) {
  return src.startsWith('http') || src.startsWith('data:') ? src : withBasePath(src);
}

export default function BlogDetailContent({ post, relatedPosts = [] }: BlogDetailContentProps) {
  const base = typeof window !== 'undefined' ? window.location.origin : (process.env.NEXT_PUBLIC_APP_URL || '');
  const postUrl = base ? `${base.replace(/\/$/, '')}/blog/${post.slug}` : `/blog/${post.slug}`;
  const shareUrl = encodeURIComponent(postUrl);
  const shareTitle = encodeURIComponent(post.title);

  return (
    <div className="blog-single-inner">
      <div className="blog-content">
        <div className="blog-image">
          <Image src={imgSrc(post.image)} alt={post.title} width={800} height={600} />
        </div>

        {post.excerpt && <p>{post.excerpt}</p>}
        {post.content && (
          <div className="blog-body" dangerouslySetInnerHTML={{ __html: post.content }} />
        )}
        {!post.excerpt && !post.content && (
          <p>No content available.</p>
        )}

        <div className="blog-tags">
          <div className="row align-items-center">
            <div className="col-md-8">
              <ul className="mata-tags">
                {post.category && (
                  <>
                    <li className="tags">Tags:</li>
                    <li>
                      <Link href={`/categories/${post.categorySlug ?? post.category.toLowerCase().replace(/\s+/g, '-')}`}>
                        {post.category}
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <div className="col-md-4">
              <ul className="social-links text-right">
                <li className="shares">Share:</li>
                <li>
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter">
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href={`https://www.instagram.com/`} target="_blank" rel="noopener noreferrer" aria-label="Share on Instagram">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="post-author">
          <div className="avatar">
            <Image src={imgSrc(post.authorImage)} alt={post.author} width={80} height={80} />
          </div>
          <div className="info">
            <h4 className="name">{post.author}</h4>
            <p>{post.excerpt}</p>
            <span className="designation">All stories by: {post.author}</span>
          </div>
        </div>

        {relatedPosts.length > 0 && (
          <div className="back-blog-related">
            <div className="container">
              <div className="back-title back-small-title">
                <h2>Related Posts</h2>
              </div>
              <Slider
                className="back-blog-slider-slick"
                dots={false}
                infinite={relatedPosts.length >= 3}
                speed={500}
                slidesToShow={Math.min(3, relatedPosts.length)}
                slidesToScroll={1}
                autoplay={relatedPosts.length >= 3}
                autoplaySpeed={3000}
                arrows={false}
                responsive={[
                  { breakpoint: 992, settings: { slidesToShow: 3 } },
                  { breakpoint: 768, settings: { slidesToShow: 2 } },
                  { breakpoint: 0, settings: { slidesToShow: 1 } },
                ]}
              >
                {relatedPosts.map((rp) => (
                  <div key={rp.id} className="item">
                    <div className="back-inner">
                      <div className="back-blog-image">
                        <Link href={`/blog/${rp.slug}`}>
                          <Image src={imgSrc(rp.image)} alt={rp.title} width={800} height={600} />
                        </Link>
                      </div>
                      <div className="back-blog-content">
                        <em className="back-blog-date">{rp.date}</em>
                        <Link href={`/blog/${rp.slug}`}>
                          <h3>{rp.title}</h3>
                        </Link>
                        <ul>
                          <li className="back-author">
                            <span>
                              <Image src={imgSrc(rp.authorImage)} alt={rp.author} width={40} height={40} />
                            </span>
                            <Link href="/author">by {rp.author}</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        )}

        <CommentSection post={post} />
      </div>
    </div>
  );
}
