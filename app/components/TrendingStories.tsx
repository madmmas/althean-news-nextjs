"use client";
import Image from 'next/image';

import { withBasePath } from "@/lib/basePath";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import Slider dynamically to prevent SSR issues
const Slider = dynamic(() => import("react-slick"), {
  ssr: false,
  loading: () => <div style={{ minHeight: '300px' }} />
});

export default function TrendingStories() {
  const [mounted, setMounted] = useState(false);
  const [slidesToShow, setSlidesToShow] = useState(4);

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

  const sliderSettings = {
    dots: false,
    infinite: true,
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

  return (
    <div className="back-trending-stories">
      <div className="container">
        <div className="back-title">
          <h2>Trending Stories</h2>
        </div>
        {mounted ? (
          <Slider 
            key={`slider-${slidesToShow}`}
            {...sliderSettings} 
          className="back-trending-slider"
        >
          <li>
            <div className="image-areas">
              <Link href={`/blog/those-other-collage-expenses`}>
                <Image src={withBasePath("/assets/images/trending/1.jpg")}
                  alt="image"
                  width={800}
                  height={600}
                />
              </Link>
              <Link href="/categories/beauty" className="back-cate back-beauty">
                Beauty
              </Link>
            </div>
            <div className="back-btm-content">
              <h3>
                <Link href={`/blog/those-other-collage-expenses`}>
                  Beauty queens need beauty material & products
                </Link>
              </h3>
              <ul>
                <li className="back-author">
                  by <Link href={`/author`}>Jon Deo</Link>
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
                  April 29, 2022
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div className="image-areas">
              <Link href={`/blog/those-other-collage-expenses`}>
                <Image src={withBasePath("/assets/images/trending/2.jpg")}
                  alt="image"
                  width={800}
                  height={600}
                />
              </Link>
              <Link href="/categories/travel" className="back-cate back-tra">
                Travel
              </Link>
            </div>
            <div className="back-btm-content">
              <h3>
                <Link href={`/blog/those-other-collage-expenses`}>
                  Selective focus photography of orange fox life
                </Link>
              </h3>
              <ul>
                <li className="back-author">
                  by <Link href={`/author`}>Jon Deo</Link>
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
                  March 25, 2022
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div className="image-areas">
              <Link href={`/blog/those-other-collage-expenses`}>
                <Image src={withBasePath("/assets/images/trending/3.jpg")}
                  alt="image"
                  width={800}
                  height={600}
                />
              </Link>
              <Link href="/categories/design" className="back-cate back-design">
                Design
              </Link>
            </div>
            <div className="back-btm-content">
              <h3>
                <Link href={`/blog/those-other-collage-expenses`}>
                  How youth viral diseases may the year 2022
                </Link>
              </h3>
              <ul>
                <li className="back-author">
                  by <Link href={`/author`}>Jon Deo</Link>
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
                  May 29, 2022
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div className="image-areas">
              <Link href={`/blog/those-other-collage-expenses`}>
                <Image src={withBasePath("/assets/images/trending/4.jpg")}
                  alt="image"
                  width={800}
                  height={600}
                />
              </Link>
              <Link href="/categories/politics" className="back-cate back-poli">
                Politics
              </Link>
            </div>
            <div className="back-btm-content">
              <h3>
                <Link href={`/blog/those-other-collage-expenses`}>
                  Woman wearing a blue on leather by pink smoke
                </Link>
              </h3>
              <ul>
                <li className="back-author">
                  by <Link href={`/author`}>Jon Deo</Link>
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
                  June 20, 2022
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div className="image-areas">
              <Link href={`/blog/those-other-collage-expenses`}>
                <Image src={withBasePath("/assets/images/trending/5.jpg")}
                  alt="image"
                  width={800}
                  height={600}
                />
              </Link>
              <Link
                href="/categories/technology"
                className="back-cate back-tech"
              >
                Technology
              </Link>
            </div>
            <div className="back-btm-content">
              <h3>
                <Link href={`/blog/those-other-collage-expenses`}>
                  Virtual reality is here on leather by pink works
                </Link>
              </h3>
              <ul>
                <li className="back-author">
                  by <Link href={`/author`}>Jon Deo</Link>
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
                  June 20, 2022
                </li>
              </ul>
            </div>
          </li>
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
