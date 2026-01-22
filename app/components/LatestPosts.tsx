"use client";
import Image from 'next/image';

import { withBasePath } from "@/lib/basePath";
import Link from "next/link";

export default function LatestPosts() {
  return (
    <div className="back-hero-area back-latest-posts">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="back-title">
              <h2>Latest Posts</h2>
            </div>
          </div>
          <div className="col-md-4 text-right">
            <Link href="/blog" className="back-btn">
              View All
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8">
            <ul>
              <li>
                <div className="image-area">
                  <Link href={`/blog/those-other-collage-expenses`}>
                    <Image src={withBasePath("/assets/images/latest-news/1.jpg")}
                      alt="image"
                  width={800}
                  height={600}
                />
                  </Link>
                  <div className="back-btm-content">
                    <Link
                      href="/categories/politics"
                      className="back-cate back-tra"
                    >
                      Politics
                    </Link>
                    <h3>
                      <Link href={`/blog/those-other-collage-expenses`}>
                        Well designed and well printed only <br />
                        for you and the audience.
                      </Link>
                    </h3>
                    <ul>
                      <li className="back-author">
                        <span>
                          <Image src={withBasePath("/assets/images/author/1.jpg")}
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
                        March 26, 2022
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
                        95 Comments
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 md-mt-40">
            <ul className="back-hero-bottom">
              <li>
                <div className="image-areas">
                  <Link href={`/blog/those-other-collage-expenses`}>
                    <Image src={withBasePath("/assets/images/latest-news/2.jpg")}
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
                      Top 20 best thems plugn & on this year visit Expart
                    </Link>
                  </h3>
                </div>
              </li>
              <li>
                <div className="image-areas">
                  <Link href={`/blog/those-other-collage-expenses`}>
                    <Image src={withBasePath("/assets/images/latest-news/3.jpg")}
                      alt="image"
                  width={800}
                  height={600}
                />
                  </Link>
                </div>
                <div className="back-btm-content">
                  <Link
                    href="/categories/art-and-design"
                    className="back-cates"
                  >
                    Art & Design
                  </Link>
                  <h3>
                    <Link href={`/blog/those-other-collage-expenses`}>
                      That woman comes from of heaven look like angel
                    </Link>
                  </h3>
                </div>
              </li>
              <li>
                <div className="image-areas">
                  <Link href={`/blog/those-other-collage-expenses`}>
                    <Image src={withBasePath("/assets/images/latest-news/4.jpg")}
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
                      Green leaves photo plant the with cute girl modeling
                    </Link>
                  </h3>
                </div>
              </li>
              <li>
                <div className="image-areas">
                  <Link href={`/blog/those-other-collage-expenses`}>
                    <Image src={withBasePath("/assets/images/latest-news/5.jpg")}
                      alt="image"
                  width={800}
                  height={600}
                />
                  </Link>
                </div>
                <div className="back-btm-content">
                  <Link href="/categories/fashion" className="back-cates">
                    Fashion
                  </Link>
                  <h3>
                    <Link href={`/blog/those-other-collage-expenses`}>
                      Peveraging tech to drive a better IT best experience
                    </Link>
                  </h3>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
