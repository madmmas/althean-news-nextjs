"use client";
import Image from 'next/image';

import { withBasePath } from "@/lib/basePath";
import Link from "next/link";
import Breadcrumbs from "../components/Breadcrumbs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function AboutPage() {
  const socialStats = [
    { icon: "fa-facebook-f", label: "Followers", value: "750" },
    { icon: "fa-twitter", label: "Fans", value: "1236" },
    { icon: "fa-instagram", label: "Likes", value: "523" },
    { icon: "fa-vimeo-v", label: "Comments", value: "790" },
    { icon: "fa-linkedin-in", label: "Followers", value: "1025" },
    { icon: "fa-youtube", label: "Subscribers", value: "590M" },
  ];

  const latestPosts = [
    {
      image: "/assets/images/dont/1.jpg",
      category: "Politics",
      title: "Time can never stop for anyone",
    },
    {
      image: "/assets/images/dont/2.jpg",
      category: "Music",
      title: "Everyone loves to listen to music",
    },
    {
      image: "/assets/images/dont/3.jpg",
      category: "Lifestyle",
      title: "10 easy habits to make your life",
    },
    {
      image: "/assets/images/dont/4.jpg",
      category: "Travel",
      title: "World tranding best 10 website",
    },
  ];

  const instagramFeed = [
    "/assets/images/instragram/1.jpg",
    "/assets/images/instragram/2.jpg",
    "/assets/images/instragram/3.jpg",
    "/assets/images/instragram/4.jpg",
    "/assets/images/instragram/5.jpg",
    "/assets/images/instragram/6.jpg",
  ];

  const teamMembers = [
    {
      image: "/assets/images/team/1.jpg",
      name: "Andrew Flintof Jr",
      role: "Sr. Creative Director",
    },
    {
      image: "/assets/images/team/2.jpg",
      name: "Halle Berry Nastia",
      role: "Art Director",
    },
    {
      image: "/assets/images/team/3.jpg",
      name: "Glenn Close Rossie",
      role: "Marketing Head",
    },
    {
      image: "/assets/images/team/4.jpg",
      name: "Johnny Depp Bosman",
      role: "Manager & CEO",
    },
  ];

  return (
    <>
      <Breadcrumbs title="About Us" />

      {/* About + sidebar section */}
      <div className="back-hero-area back-latest-posts back-whats-posts">
        <div className="container">
          <div className="row">
            {/* Left content */}
            <div className="col-lg-8 md-pb-70">
              <div className="back-title">
                <h2>Who we Are?</h2>
              </div>
              <p>
                Possimus labore ad tempora blandit totam blanditiis fusce urna
                mollit facilisi expedita? Sociis, facilisis adipisci maiores
                dolores voluptate odio magna eius iste facilisi illo, illo
                elementum per interdum! Odit pellentesque atque commodi, hic
                hendrerit leo commodo voluptates maiores mollit, dolor
                voluptatem recusandae dolorem dolore hac, iaculis, aliquet!
                Earum facere, nihil, sodales cillum! Arcu pulvinar, temporibus
                integer ullamcorper.
              </p>
              <div className="back-about-image pt-30 pb-30">
                <Image src={withBasePath("/assets/images/about.png")}
                  alt="Back Add"
                  width={800}
                  height={600}
                />
              </div>
              <h4>Unique visual system and method.</h4>
              <p>
                Rhoncus urna aliquet? Magni varius? Tempora penatibus odio quas
                quis cupidatat magni? Dis exercitation, dignissimos vestibulum?
                Totam nihil, pulvinar etiam platea itaque, officia? Cillum
                auctor facilis, eu nostra euismod explicabo. Voluptate eget
                ullam omnis habitant sociis vivamus.
              </p>
              <ul className="dot-list">
                <li>User Experience</li>
                <li>Unique layouts Blocks</li>
                <li>Strategy and Art Direction</li>
              </ul>
              <p>
                Adipisci, reprehenderit platea cras ut quia consectetur
                convallis.
              </p>
              <div className="pt-20">
                <a href="#" className="back-btn">
                  Contact Us
                </a>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="col-lg-4 pl-30 md-pt-45">
              <div className="back-title back-small-title">
                <h2>Get in Touch</h2>
              </div>
              <ul className="social-area">
                {socialStats.map((item, index) => (
                  <li key={index}>
                    <div>
                      <a href="#">
                        <i className={`fa-brands ${item.icon}`}></i>
                      </a>
                      <span>
                        {item.label} <em>{item.value}</em>
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="back-title back-small-title pt-30">
                <h2>Latest Posts</h2>
              </div>
              <ul className="back-hero-bottom">
                {latestPosts.map((post, index) => (
                  <li key={index}>
                    <div className="image-areas">
                      <Link href="/blog/those-other-collage-expenses">
                        <Image src={withBasePath(post.image)} alt="image"
                  width={800}
                  height={600}
                />
                      </Link>
                    </div>
                    <div className="back-btm-content">
                      <Link
                        href={`/categories/${post.category
                          .toLowerCase()
                          .replace(/\s+/g, "-")
                          .replace(/&/g, "and")}`}
                        className="back-cates"
                      >
                        {post.category}
                      </Link>
                      <h3>
                        <Link href="/blog/those-other-collage-expenses">{post.title}</Link>
                      </h3>
                      <ul>
                        <li className="back-date">
                          by <Link href={`/author`}>Jon Deo</Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="back-title back-small-title pt-25">
                <h2>Follow Us</h2>
              </div>
              <ul className="back-instragram">
                {instagramFeed.map((src, index) => (
                  <li key={index}>
                    <a href="#">
                      <Image src={withBasePath(src)} alt="image"
                  width={800}
                  height={600}
                />{" "}
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Team section */}
      <div className="back-team">
        <div className="container">
          <div className="back-title">
            <h2>Meet Our Team</h2>
          </div>
          <Slider
            className="team-slider team-slider-slick"
            dots={false}
            infinite={true}
            speed={500}
            slidesToShow={4}
            slidesToScroll={1}
            autoplay={true}
            autoplaySpeed={4000}
            arrows={true}
            responsive={[
              {
                breakpoint: 992,
                settings: {
                  slidesToShow: 4,
                  arrows: true,
                }
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 3,
                  arrows: false,
                }
              },
              {
                breakpoint: 576,
                settings: {
                  slidesToShow: 2,
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
            ]}
          >
            {teamMembers.map((member, index) => (
              <div className="single-team" key={index}>
                <div className="team-img">
                  <Image src={withBasePath(member.image)} alt="Team Image"
                  width={800}
                  height={600}
                />
                  <ul className="social-links">
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
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-linkedin-in"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="team-info">
                  <h3 className="name">{member.name}</h3>
                  <p className="desgnation">{member.role}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}
