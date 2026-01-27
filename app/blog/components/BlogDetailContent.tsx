"use client";
import Image from 'next/image';

import { withBasePath } from "@/lib/basePath";
import { BlogPost } from "@/lib/blogPosts";
import Link from "next/link";
import CommentSection from "./CommentSection";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface BlogDetailContentProps {
  post?: BlogPost;
}

const relatedPosts = [
  {
    image: "/assets/images/related/1.jpg",
    date: "April 13, 2022",
    title: "Fostering future schools & social innovation",
    author: "Nina Allon",
    authorImage: "/assets/images/author/1.jpg",
  },
  {
    image: "/assets/images/related/2.jpg",
    date: "May 17, 2022",
    title: "The surprising reason collegeTuition is crazy..",
    author: "Nina Allon",
    authorImage: "/assets/images/author/2.jpg",
  },
  {
    image: "/assets/images/related/3.jpg",
    date: "October 14, 2022",
    title: "Those other college expenses about",
    author: "Nina Allon",
    authorImage: "/assets/images/author/3.jpg",
  },
  {
    image: "/assets/images/related/4.jpg",
    date: "April 19, 2022",
    title: "Fostering future schools & social innovation",
    author: "Nina Allon",
    authorImage: "/assets/images/author/4.jpg",
  },
];

const comments = [
  {
    image: "/assets/images/user/user2.jpg",
    name: "Neal Adams",
    date: "July 21, 2022 at 8:24 pm",
    text: "Geeza show off show off pick your nose and blow off the BBC lavatory a blinding shot cack spend a penny bugger all mate brolly.",
  },
  {
    image: "/assets/images/user/user.jpg",
    name: "Jim Séchen",
    date: "July 21, 2022 at 10:44 pm",
    text: "The little rotter my good sir faff about Charles bamboozled I such a fibber tomfoolery at public school.",
  },
  {
    image: "/assets/images/user/user3.jpg",
    name: "Justin Case",
    date: "July 21, 2022 at 17:44 pm",
    text: "The little rotter my good sir faff about Charles bamboozled I such a fibber tomfoolery at public school.",
  },
];

export default function BlogDetailContent({ post }: BlogDetailContentProps) {
  // If no post provided, use default/placeholder content
  if (!post) {
    return (
      <div className="blog-single-inner">
        <div className="blog-content">
          <div className="blog-image">
            <Image src={withBasePath("/assets/images/blog-grid/2.jpg")}
              alt="Blog Image"
                  width={800}
                  height={600}
                />
          </div>
          <p>
            Education every new parents knows the feeling nothing more than for
            everyone to get at some sleep.But at least you&apos;ve got Google.
            start building your first prototype today!
          </p>
          <p>
            Another important part of staying healthy is staying active. Opening
            up this app concept shows several options for workouts, from yoga to
            biking. Tapping on the small gray cards while swiping through them
            enlarges them, turns them bright, and even brings a fun animation
            moving across the card. Selecting in cycling.
          </p>
          <div className="back-order-list">
            <h3>Unordered & Ordered Lists</h3>
            <p>
              It is advisable to use your network to successfully land a job.
              Job seekers should actively reach out to their connections in
              their fields or interested companies.
            </p>
            <ul>
              <li>
                <i className="fa-solid fa-check"></i> Your child&apos;s
                interests, likes, dislikes
              </li>
              <li>
                <i className="fa-solid fa-check"></i> Their routines- patterns
                of eating, sleeping, toileting
              </li>
              <li>
                <i className="fa-solid fa-check"></i> Your child&apos;s current
                wellbeing
              </li>
              <li>
                <i className="fa-solid fa-check"></i> Any major events taking
                place at home.
              </li>
            </ul>
          </div>

          <blockquote>
            Before Natalia&apos;s village had a clean water tap, she often did
            have time for school. Now, she goes to school every day she presient
            of her local Water Committee. <em>Max Conversion</em>
          </blockquote>

          <p>
            Sometimes, even a good email get&apos;s trapped, which requires
            actual human intervention. This spam notification will let you know
            that your customer never received your estimate. Ensure to reach out
            to your customer and ask them to add happening.
          </p>

          <div className="blog-tags">
            <div className="row align-items-center">
              <div className="col-md-8">
                <ul className="mata-tags">
                  <li className="tags">Tags:</li>
                  <li>
                    <a href="#">Travel</a>
                  </li>
                  <li>
                    <a href="#">Politics</a>
                  </li>
                  <li>
                    <a href="#">Fashion</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-4">
                <ul className="social-links text-right">
                  <li className="shares">Share:</li>
                  <li>
                    <a href="#">
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa-brands fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <a href="#" className="post-author">
            <div className="avatar">
              <Image src={withBasePath("/assets/images/single-blog/1.jpg")}
                alt="Author"
                  width={800}
                  height={600}
                />
            </div>
            <div className="info">
              <h4 className="name">Sara Mening</h4>
              <p>
                Only a quid bum bag cheeky bugger geeza car boot what a load of
                rubbish super burke tomfoolery up the kyver plastered.
              </p>
              <span className="designation">All stories by : Sara Mening</span>
            </div>
          </a>

          <div className="single-nav">
            <div className="back-prev">
              {" "}
              <a href="#">
                <i className="fa-solid fa-arrow-right"></i> Preovious Post{" "}
                <em>Social media strategies</em>
              </a>{" "}
            </div>

            <div className="back-next">
              <a href="#">
                Next Post <i className="fa-solid fa-arrow-right"></i>{" "}
                <em> Amazing theme performance</em>
              </a>
            </div>
          </div>

          <div className="back-blog-related">
            <div className="container">
              <div className="back-title back-small-title">
                <h2>Related Posts</h2>
              </div>
              <Slider
                className="back-blog-slider-slick"
                dots={false}
                infinite={true}
                speed={500}
                slidesToShow={3}
                slidesToScroll={1}
                autoplay={true}
                autoplaySpeed={3000}
                arrows={false}
                responsive={[
                  {
                    breakpoint: 992,
                    settings: {
                      slidesToShow: 3,
                    }
                  },
                  {
                    breakpoint: 768,
                    settings: {
                      slidesToShow: 2,
                    }
                  },
                  {
                    breakpoint: 0,
                    settings: {
                      slidesToShow: 1,
                    }
                  }
                ]}
              >
                {relatedPosts.map((post, index) => (
                  <li key={index} className="item">
                    <div className="back-inner">
                      <div className="back-blog-image">
                        <a href="#">
                          <Image src={withBasePath(post.image)} alt=""
                  width={800}
                  height={600}
                />
                        </a>
                      </div>
                      <div className="back-blog-content">
                        <em className="back-blog-date">{post.date}</em>
                        <a href="#">
                          <h3>{post.title}</h3>
                        </a>
                        <ul>
                          <li className="back-author">
                            {" "}
                            <span>
                              <Image src={withBasePath(post.authorImage)}
                                alt="image"
                  width={800}
                  height={600}
                />
                            </span>{" "}
                            <Link href={`/author`}>by Jon Deo</Link>{" "}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                ))}
              </Slider>
            </div>
          </div>
          {post && <CommentSection post={post} />}
        </div>
      </div>
    );
  }

  // Dynamic content when post is provided
  return (
    <div className="blog-single-inner">
      <div className="blog-content">
        <div className="blog-image">
          <Image src={withBasePath(post.image)} alt={post.title}
                  width={800}
                  height={600}
                />
        </div>

        <p>{post.excerpt}</p>
        <div className="back-order-list">
          <h3>Unordered & Ordered Lists</h3>
          <p>
            It is advisable to use your network to successfully land a job. Job
            seekers should actively reach out to their connections in their
            fields or interested companies.
          </p>
          <ul>
            <li>
              <i className="fa-solid fa-check"></i> Your child&apos;s interests,
              likes, dislikes
            </li>
            <li>
              <i className="fa-solid fa-check"></i> Their routines- patterns of
              eating, sleeping, toileting
            </li>
            <li>
              <i className="fa-solid fa-check"></i> Your child&apos;s current
              wellbeing
            </li>
            <li>
              <i className="fa-solid fa-check"></i> Any major events taking
              place at home.
            </li>
          </ul>
        </div>

        <blockquote>
          Before Natalia&apos;s village had a clean water tap, she often did
          have time for school. Now, she goes to school every day she presient
          of her local Water Committee. <em>Max Conversion</em>
        </blockquote>

        <p>
          Sometimes, even a good email get&apos;s trapped, which requires actual
          human intervention. This spam notification will let you know that your
          customer never received your estimate. Ensure to reach out to your
          customer and ask them to add happening.
        </p>

        <div className="blog-tags">
          <div className="row align-items-center">
            <div className="col-md-8">
              <ul className="mata-tags">
                <li className="tags">Tags:</li>
                <li>
                  <a href="#">Travel</a>
                </li>
                <li>
                  <a href="#">Politics</a>
                </li>
                <li>
                  <a href="#">Fashion</a>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <ul className="social-links text-right">
                <li className="shares">Share:</li>
                <li>
                  <a href="#">
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <a href="#" className="post-author">
          <div className="avatar">
            <Image src={withBasePath(post.authorImage)} alt={post.author}
                  width={800}
                  height={600}
                />
          </div>
          <div className="info">
            <h4 className="name">{post.author}</h4>
            <p>
              Only a quid bum bag cheeky bugger geeza car boot what a load of
              rubbish super burke tomfoolery up the kyver plastered.
            </p>
            <span className="designation">All stories by : {post.author}</span>
          </div>
        </a>

        <div className="single-nav">
          <div className="back-prev">
            {" "}
            <a href="#">
              <i className="fa-solid fa-arrow-right"></i> Preovious Post{" "}
              <em>Social media strategies</em>
            </a>{" "}
          </div>
          <div className="back-next">
            <a href="#">
              Next Post <i className="fa-solid fa-arrow-right"></i>{" "}
              <em> Amazing theme performance</em>
            </a>
          </div>
        </div>

        <div className="back-blog-related">
          <div className="container">
            <div className="back-title back-small-title">
              <h2>Related Posts</h2>
            </div>
            <Slider
              className="back-blog-slider-slick"
              dots={false}
              infinite={true}
              speed={500}
              slidesToShow={3}
              slidesToScroll={1}
              autoplay={true}
              autoplaySpeed={3000}
              arrows={false}
              responsive={[
                {
                  breakpoint: 992,
                  settings: {
                    slidesToShow: 3,
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 2,
                  }
                },
                {
                  breakpoint: 0,
                  settings: {
                    slidesToShow: 1,
                  }
                }
              ]}
            >
              {relatedPosts.map((relatedPost, index) => (
                <li key={index} className="item">
                  <div className="back-inner">
                    <div className="back-blog-image">
                      <a href="#">
                        <Image src={withBasePath(relatedPost.image)} alt=""
                  width={800}
                  height={600}
                />
                      </a>
                    </div>
                    <div className="back-blog-content">
                      <em className="back-blog-date">{relatedPost.date}</em>
                      <a href="#">
                        <h3>{relatedPost.title}</h3>
                      </a>
                      <ul>
                        <li className="back-author">
                          {" "}
                          <span>
                            <Image src={withBasePath(relatedPost.authorImage)}
                              alt="image"
                  width={800}
                  height={600}
                />
                          </span>{" "}
                          <a href="#">{relatedPost.author}</a>{" "}
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </Slider>
          </div>
        </div>
        <CommentSection post={post} />
      </div>
    </div>
  );
}
