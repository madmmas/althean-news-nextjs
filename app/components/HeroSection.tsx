"use client";
import Image from "next/image";

import { withBasePath } from "@/lib/basePath";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

// Import Slider dynamically to prevent SSR issues
const Slider = dynamic(() => import("react-slick"), {
  ssr: false,
  loading: () => <div style={{ minHeight: '300px' }} />
});

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [slidesToShow2, setSlidesToShow2] = useState(3);

  useEffect(() => {
    // Calculate slides for slider2 based on window width
    const calculateSlides2 = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        if (width <= 480) {
          setSlidesToShow2(1);
        } else if (width <= 768) {
          setSlidesToShow2(2);
        } else if (width <= 1024) {
          setSlidesToShow2(2);
        } else {
          setSlidesToShow2(3);
        }
      }
    };

    // Calculate initial slides
    calculateSlides2();
    
    // Mark as mounted
    setMounted(true);

    // Add resize listener
    const handleResize = () => {
      calculateSlides2();
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const sliderSettings1 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    arrows: false,
  };

  const sliderSettings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 12000,
    arrows: slidesToShow2 >= 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="back-hero-area md-mt-40">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <Slider {...sliderSettings1} className="back-hero-slider">
              <li>
                <div className="image-area">
                  <Link href={`/blog/those-other-collage-expenses`}>
                    <Image
                      src={withBasePath("/assets/images/hero-blog/1.jpg")}
                      alt="image"
                      width={800}
                      height={600}
                    />
                  </Link>
                  <div className="back-btm-content">
                    <Link
                      href="/categories/lifestyle"
                      className="back-cate back-life"
                    >
                      Lifestyle
                    </Link>
                    <h3>
                      <Link href={`/blog/those-other-collage-expenses`}>
                        Bosmogenic an designed for narita iourism in moon
                      </Link>
                    </h3>
                    <ul>
                      <li className="back-author">
                        <span>
                          <Image
                            src={withBasePath("/assets/images/author/1.jpg")}
                            alt="image"
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
                        March 29, 2022
                      </li>
                      <li className="back-comments">
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
                            className="feather feather-message-square"
                          >
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                          </svg>
                        </span>
                        99 Comments
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <div className="image-area">
                  <Link href={`/blog/those-other-collage-expenses`}>
                    <Image
                      src={withBasePath("/assets/images/hero-blog/11.jpg")}
                      alt="image"
                      width={800}
                      height={600}
                    />
                  </Link>
                  <div className="back-btm-content">
                    <Link
                      href="/categories/lifestyle"
                      className="back-cate back-life"
                    >
                      Beauty
                    </Link>
                    <h3>
                      <Link href={`/blog/those-other-collage-expenses`}>
                        Beauty an designed narita iourism in moon others
                      </Link>
                    </h3>
                    <ul>
                      <li className="back-author">
                        <span>
                          <Image
                            src={withBasePath("/assets/images/author/2.jpg")}
                            alt="image"
                            width={800}
                            height={600}
                          />
                        </span>
                        <Link href="/author">by Jon Deo</Link>
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
                        March 29, 2022
                      </li>
                      <li className="back-comments">
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
                            className="feather feather-message-square"
                          >
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                          </svg>
                        </span>
                        99 Comments
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </Slider>
          </div>
          <div className="col-lg-6 back-hero-right">
            <div className="row back-pl-6">
              <div className="col-lg-12">
                <ul>
                  <li>
                    <div className="image-area">
                      <Link href={`/blog/those-other-collage-expenses`}>
                        <Image
                          src={withBasePath("/assets/images/hero-blog/2.jpg")}
                          alt="image"
                          width={800}
                          height={600}
                        />
                      </Link>
                      <div className="back-btm-content">
                        <Link
                          href="/categories/politics"
                          className="back-cate back-poli"
                        >
                          Politics
                        </Link>
                        <h3>
                          <Link href={`/blog/those-other-collage-expenses`}>
                            Dui fames tempora maiores dicta anim? Vel curae
                            eaque ab eaque pharetra blandit
                          </Link>
                        </h3>
                        <ul>
                          <li className="back-author">
                            <span>
                              <Image
                                src={withBasePath(
                                  "/assets/images/author/1.jpg"
                                )}
                                alt="image"
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
                            March 29, 2022
                          </li>
                          <li className="back-comments">
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
                                className="feather feather-message-square"
                              >
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                              </svg>
                            </span>
                            99 Comments
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-lg-6">
                <ul className="back-pr-3">
                  <li>
                    <div className="image-area">
                      <Link href={`/blog/those-other-collage-expenses`}>
                        <Image
                          src={withBasePath("/assets/images/hero-blog/3.jpg")}
                          alt="image"
                          width={800}
                          height={600}
                        />
                      </Link>
                      <div className="back-btm-content">
                        <Link
                          href="/categories/technology"
                          className="back-cate back-tech"
                        >
                          Technology
                        </Link>
                        <h3>
                          <Link href={`/blog/those-other-collage-expenses`}>
                            Virtual reality is here!
                          </Link>
                        </h3>
                        <ul>
                          <li className="back-author">
                            <span>
                              <Image
                                src={withBasePath(
                                  "/assets/images/author/3.jpg"
                                )}
                                alt="image"
                                width={800}
                                height={600}
                              />
                            </span>
                            <Link href={`/author`}>by Jon Deo</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-lg-6">
                <ul className="back-pl-3">
                  <li>
                    <div className="image-area">
                      <Link href={`/blog/those-other-collage-expenses`}>
                        <Image
                          src={withBasePath("/assets/images/hero-blog/4.jpg")}
                          alt="image"
                          width={800}
                          height={600}
                        />
                      </Link>
                      <div className="back-btm-content">
                        <Link
                          href="/categories/travel"
                          className="back-cate back-tra"
                        >
                          Travel
                        </Link>
                        <h3>
                          <Link href={`/blog/those-other-collage-expenses`}>
                            Running on the field.
                          </Link>
                        </h3>
                        <ul>
                          <li className="back-author">
                            <span>
                              <Image
                                src={withBasePath(
                                  "/assets/images/author/2.jpg"
                                )}
                                alt="image"
                                width={800}
                                height={600}
                              />
                            </span>
                            <Link href={`/author`}>by Jon Deo</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {mounted ? (
          <Slider
            key={`slider2-${slidesToShow2}`}
            {...sliderSettings2}
          className="back-hero-bottom back-hero-slider2"
        >
          <li>
            <div className="image-areas">
              <Link href={`/blog/those-other-collage-expenses`}>
                <Image
                  src={withBasePath("/assets/images/hero-blog/5.jpg")}
                  alt="image"
                  width={800}
                  height={600}
                />
              </Link>
            </div>
            <div className="back-btm-content">
              <Link href="/categories/design" className="back-cates">
                Design
              </Link>
              <h3>
                <Link href={`/blog/those-other-collage-expenses`}>
                  Beautiful lady hookup
                </Link>
              </h3>
              <ul>
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
                  March 22, 2022
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div className="image-areas">
              <Link href={`/blog/those-other-collage-expenses`}>
                <Image
                  src={withBasePath("/assets/images/hero-blog/6.jpg")}
                  alt="image"
                  width={800}
                  height={600}
                />
              </Link>
            </div>
            <div className="back-btm-content">
              <Link href="/categories/travel" className="back-cates">
                Travel
              </Link>
              <h3>
                <Link href={`/blog/those-other-collage-expenses`}>
                  Need some fresh air
                </Link>
              </h3>
              <ul>
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
                  April 20, 2022
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div className="image-areas">
              <Link href={`/blog/those-other-collage-expenses`}>
                <Image
                  src={withBasePath("/assets/images/hero-blog/7.jpg")}
                  alt="image"
                  width={800}
                  height={600}
                />
              </Link>
            </div>
            <div className="back-btm-content">
              <Link href="/categories/technology" className="back-cates">
                Technology
              </Link>
              <h3>
                <Link href={`/blog/those-other-collage-expenses`}>
                  Art is creative minds
                </Link>
              </h3>
              <ul>
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
                  May 20, 2022
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div className="image-areas">
              <Link href={`/blog/those-other-collage-expenses`}>
                <Image
                  src={withBasePath("/assets/images/hero-blog/8.jpg")}
                  alt="image"
                  width={800}
                  height={600}
                />
              </Link>
            </div>
            <div className="back-btm-content">
              <Link href="/categories/lifestyle" className="back-cates">
                Lifestyle
              </Link>
              <h3>
                <Link href={`/blog/those-other-collage-expenses`}>
                  Beautiful lady hookup
                </Link>
              </h3>
              <ul>
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
                  March 22, 2022
                </li>
              </ul>
            </div>
          </li>
        </Slider>
        ) : (
          <div className="back-hero-bottom back-hero-slider2" style={{ minHeight: '300px' }}>
            {/* Loading placeholder */}
          </div>
        )}
      </div>
    </div>
  );
}
