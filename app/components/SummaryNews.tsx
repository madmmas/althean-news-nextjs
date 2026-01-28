'use client';

import Image from 'next/image';
import { withBasePath } from '@/lib/basePath';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { getSummaries, type StrapiSummary } from '@/lib/strapi';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Import Slider dynamically to prevent SSR issues
const Slider = dynamic(() => import('react-slick'), {
  ssr: false,
  loading: () => <div style={{ minHeight: '300px' }} />
});

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
  // Remove HTML tags
  const plain = content.replace(/<[^>]+>/g, '').trim();
  // Return truncated text
  return plain.length > maxLength ? plain.slice(0, maxLength) + '...' : plain;
}

export default function SummaryNews() {
  const [mounted, setMounted] = useState(false);
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [summaries, setSummaries] = useState<StrapiSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Calculate slides based on window width
    const calculateSlides = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        if (width <= 480) {
          setSlidesToShow(1);
        } else if (width <= 768) {
          setSlidesToShow(2);
        } else if (width <= 992) {
          setSlidesToShow(3);
        } else if (width <= 1024) {
          setSlidesToShow(3);
        } else if (width <= 1200) {
          setSlidesToShow(4);
        } else {
          setSlidesToShow(4);
        }
      }
    };

    // Calculate initial slides
    calculateSlides();
    
    // Mark as mounted
    setMounted(true);

    // Add resize listener
    const handleResize = () => {
      calculateSlides();
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    async function fetchSummaries() {
      try {
        setLoading(true);
        const data = await getSummaries();
        setSummaries(data);
      } catch (error) {
        console.error('Error fetching summaries:', error);
        setSummaries([]);
      } finally {
        setLoading(false);
      }
    }

    fetchSummaries();
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: summaries.length > slidesToShow,
    speed: 800,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: slidesToShow >= 4,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          arrows: true,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          arrows: true,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          arrows: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          arrows: false,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          arrows: false,
        }
      },
      {
        breakpoint: 0,
        settings: {
          slidesToShow: 1,
          arrows: false,
        }
      }
    ]
  };

  if (loading) {
    return (
      <div className="back-trending-stories">
        <div className="container">
          <div className="back-title">
            <h2>Summary News</h2>
          </div>
          <div className="back-trending-slider" style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p>Loading summaries...</p>
          </div>
        </div>
      </div>
    );
  }

  if (summaries.length === 0) {
    return (
      <div className="back-trending-stories">
        <div className="container">
          <div className="back-title">
            <h2>Summary News</h2>
          </div>
          <div className="back-trending-slider" style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p>No summaries available.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="back-trending-stories">
      <div className="container">
        <div className="back-title">
          <h2>Summary News</h2>
        </div>
        {mounted ? (
          <Slider 
            key={`slider-${slidesToShow}`}
            {...sliderSettings} 
            className="back-trending-slider"
          >
            {summaries.map((summary) => {
              // Use placeholder image since summaries don't have images
              const imageUrl = withBasePath('/assets/images/trending/1.jpg');
              // Use publishAt, publishedAt, or createdAt for date
              const date = formatDate(summary.publishAt || summary.publishedAt || summary.createdAt);
              // Create slug from documentId - use /api/summaries/[documentId] route
              const slug = `/api/summaries/${summary.documentId}`;
              // Get excerpt from excerpt field or extract from content
              const displayExcerpt = summary.excerpt || getPlainTextExcerpt(summary.content, 100);

              return (
                <li key={summary.id}>
                  <div className="image-areas">
                    <Link href={slug}>
                      <Image 
                        src={imageUrl}
                        alt={summary.title}
                        width={800}
                        height={600}
                      />
                    </Link>
                    <Link 
                      href={`/api/summaries/${summary.documentId}`} 
                      className="back-cate back-tra"
                    >
                      Summary
                    </Link>
                  </div>
                  <div className="back-btm-content">
                    <h3>
                      <Link href={slug}>
                        {summary.title}
                      </Link>
                    </h3>
                    {displayExcerpt && (
                      <p style={{ marginTop: '10px', marginBottom: '10px', fontSize: '14px', color: '#666' }}>
                        {displayExcerpt}
                      </p>
                    )}
                    {summary.sources && summary.sources.length > 0 && (
                      <div style={{ marginTop: '10px', fontSize: '12px', color: '#999' }}>
                        <span>Sources: </span>
                        {summary.sources.map((source, index) => (
                          <span key={index}>
                            <a 
                              href={source.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              style={{ color: '#007bff', textDecoration: 'none' }}
                            >
                              {source.source_name}
                            </a>
                            {index < summary.sources!.length - 1 && ', '}
                          </span>
                        ))}
                      </div>
                    )}
                    <ul>
                      {date && (
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
                          {date}
                        </li>
                      )}
                    </ul>
                  </div>
                </li>
              );
            })}
          </Slider>
        ) : (
          <div className="back-trending-slider" style={{ minHeight: '300px' }}>
            {/* Loading placeholder */}
          </div>
        )}
      </div>
    </div>
  );
}
