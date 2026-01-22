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

export default function FooterTop() {
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
          setSlidesToShow(2);
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
  const footerTopPosts = [
    {
      image: "/assets/images/footer-top/1.jpg",
      category: "Lifestyle",
      categoryClass: "back-life",
      title:
        "The 15 best designer tote bags on that carry it all of the sports",
      authorImage: "/assets/images/author/1.jpg",
      date: "March 29, 2022",
    },
    {
      image: "/assets/images/footer-top/2.jpg",
      category: "Travel",
      categoryClass: "back-tra",
      title: "Kilitary-inspired fashions take on new design bnoloine war",
      authorImage: "/assets/images/author/2.jpg",
      date: "March 29, 2022",
    },
    {
      image: "/assets/images/footer-top/3.jpg",
      category: "Technology",
      categoryClass: "back-tech",
      title: "Advanced sensor system may open door to zero death driving",
      authorImage: "/assets/images/author/2.jpg",
      date: "March 29, 2022",
    },
    {
      image: "/assets/images/footer-top/4.jpg",
      category: "Fashion",
      categoryClass: "back-fashion",
      title: "Palenciaga and crocs team new 'pool' style of other nation",
      authorImage: "/assets/images/author/2.jpg",
      date: "March 29, 2022",
    },
    {
      image: "/assets/images/footer-top/5.jpg",
      category: "Politics",
      categoryClass: "back-poli",
      title: "wearing black pullover hoodie to smoke light in mask his own",
      authorImage: "/assets/images/author/2.jpg",
      date: "March 29, 2022",
    },
  ];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      },
      {
        breakpoint: 0,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="back-hero-area footer-top-area">
      {mounted ? (
        <Slider 
          key={`slider-${slidesToShow}`}
          {...sliderSettings} 
        className="back-footer-top-slider"
      >
        {footerTopPosts.map((post, index) => (
          <li key={index}>
            <div className="image-area">
              <Link href={`/blog/those-other-collage-expenses`}>
                  <Image src={withBasePath(post.image)} alt="image"
                    width={800}
                    height={600}
                  />
              </Link>
              <div className="back-btm-content">
                <Link
                  href={`/categories/${post.category
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/&/g, "and")}`}
                  className={`back-cate ${post.categoryClass}`}
                >
                  {post.category}
                </Link>
                <h3>
                  <Link href={`/blog/those-other-collage-expenses`}>
                    {post.title}
                  </Link>
                </h3>
                <ul>
                  <li className="back-author">
                    <span>
                        <Image src={withBasePath(post.authorImage)} alt="image"
                    width={800}
                    height={600}
                  />
                    </span>
                    <Link href={`/author`}>by Jon Deo</Link>
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
            </div>
          </li>
        ))}
        </Slider>
      ) : (
        <div className="back-footer-top-slider" style={{ minHeight: '300px' }}>
          {/* Loading placeholder */}
        </div>
      )}
    </div>
  );
}
