'use client';

import Image from 'next/image';
import { withBasePath } from '@/lib/basePath';
import type { StrapiSummary } from '@/lib/strapi';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface SummaryDetailContentProps {
  summary: StrapiSummary;
  relatedSummaries?: StrapiSummary[];
}

function imgSrc(src: string) {
  return src.startsWith('http') || src.startsWith('data:') ? src : withBasePath(src);
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

// Helper function to strip HTML tags and get plain text excerpt
function getPlainTextExcerpt(content: string, maxLength: number = 100): string {
  if (!content) return '';
  const plain = content.replace(/<[^>]+>/g, '').trim();
  return plain.length > maxLength ? plain.slice(0, maxLength) + '...' : plain;
}

export default function SummaryDetailContent({ summary, relatedSummaries = [] }: SummaryDetailContentProps) {
  const base = typeof window !== 'undefined' ? window.location.origin : (process.env.NEXT_PUBLIC_APP_URL || '');
  const summaryUrl = base ? `${base.replace(/\/$/, '')}/api/summaries/${summary.documentId}` : `/api/summaries/${summary.documentId}`;
  const shareUrl = encodeURIComponent(summaryUrl);
  const shareTitle = encodeURIComponent(summary.title);
  const date = formatDate(summary.publishAt || summary.publishedAt || summary.createdAt);
  const excerpt = summary.excerpt || getPlainTextExcerpt(summary.content, 160);

  const sliderSettings = {
    dots: false,
    infinite: relatedSummaries.length > 3,
    speed: 500,
    slidesToShow: Math.min(3, relatedSummaries.length),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: relatedSummaries.length > 3,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: Math.min(2, relatedSummaries.length),
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: false,
        }
      }
    ]
  };

  return (
    <div className="blog-single-inner">
      <div className="blog-content">
        {/* Placeholder image since summaries don't have images */}
        <div className="blog-image">
          <Image 
            src={withBasePath('/assets/images/blog-grid/1.jpg')} 
            alt={summary.title} 
            width={800} 
            height={600} 
          />
        </div>

        {excerpt && <p className="blog-excerpt">{excerpt}</p>}
        
        {summary.content && (
          <div className="blog-body" dangerouslySetInnerHTML={{ __html: summary.content }} />
        )}
        
        {!excerpt && !summary.content && (
          <p>No content available.</p>
        )}

        {/* Sources Section */}
        {summary.sources && summary.sources.length > 0 && (
          <div className="blog-sources" style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '15px', fontSize: '18px', fontWeight: '600' }}>Sources</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {summary.sources.map((source, index) => (
                <li key={index} style={{ marginBottom: '10px' }}>
                  <a 
                    href={source.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      color: '#007bff', 
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    <span>{source.source_name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="blog-tags">
          <div className="row align-items-center">
            <div className="col-md-8">
              <ul className="mata-tags">
                <li className="tags">Tags:</li>
                <li>
                  <Link href={`/api/summaries/${summary.documentId}`} className="tag">
                    Summary
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <ul className="social-share">
                <li>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Facebook"
                  >
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Twitter"
                  >
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on LinkedIn"
                  >
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                </li>
                <li>
                  <a
                    href={`https://pinterest.com/pin/create/button/?url=${shareUrl}&description=${shareTitle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Pinterest"
                  >
                    <i className="fa-brands fa-pinterest"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="blog-author">
          <div className="author-image">
            <Image
              src={withBasePath('/assets/images/author/1.jpg')}
              alt="Author"
              width={80}
              height={80}
            />
          </div>
          <div className="author-content">
            <h4>Althean News</h4>
            <p>News Summary</p>
            {date && (
              <span className="author-date">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
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
                {date}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Related Summaries */}
      {relatedSummaries.length > 0 && (
        <div className="related-posts" style={{ marginTop: '50px' }}>
          <h3 style={{ marginBottom: '30px', fontSize: '24px', fontWeight: '600' }}>Related Summaries</h3>
          <Slider {...sliderSettings}>
            {relatedSummaries.map((related) => {
              const relatedExcerpt = related.excerpt || getPlainTextExcerpt(related.content, 80);
              return (
                <div key={related.id} style={{ padding: '0 10px' }}>
                  <div className="related-post-item" style={{ border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
                    <div className="related-image">
                      <Link href={`/api/summaries/${related.documentId}`}>
                        <Image
                          src={withBasePath('/assets/images/trending/1.jpg')}
                          alt={related.title}
                          width={300}
                          height={200}
                          style={{ width: '100%', height: 'auto' }}
                        />
                      </Link>
                    </div>
                    <div className="related-content" style={{ padding: '15px' }}>
                      <h4 style={{ marginBottom: '10px', fontSize: '16px' }}>
                        <Link href={`/api/summaries/${related.documentId}`} style={{ color: '#333', textDecoration: 'none' }}>
                          {related.title}
                        </Link>
                      </h4>
                      {relatedExcerpt && (
                        <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                          {relatedExcerpt}
                        </p>
                      )}
                      {(related.publishAt || related.publishedAt) && (
                        <span style={{ fontSize: '12px', color: '#999' }}>
                          {formatDate(related.publishAt || related.publishedAt)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      )}
    </div>
  );
}
