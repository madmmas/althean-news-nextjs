import Image from 'next/image';
import { withBasePath } from "@/lib/basePath";
import Link from "next/link";

const heroBottomPosts = [
  {
    image: "/assets/images/latest-news/2.jpg",
    category: "Music",
    title: "Summer activities in music",
    date: "March 26, 2022",
  },
  {
    image: "/assets/images/latest-news/3.jpg",
    category: "Technology",
    title: "Work & relax with your mind",
    date: "March 26, 2022",
  },
  {
    image: "/assets/images/latest-news/4.jpg",
    category: "Travel",
    title: "Speed city never stopped",
    date: "March 26, 2022",
  },
];

const socialStats = [
  { icon: "fa-facebook-f", label: "Followers", value: "750" },
  { icon: "fa-twitter", label: "Fans", value: "1236" },
  { icon: "fa-instagram", label: "Likes", value: "523" },
  { icon: "fa-vimeo-v", label: "Comments", value: "790" },
  { icon: "fa-linkedin-in", label: "Followers", value: "1025" },
  { icon: "fa-youtube", label: "Subscribers", value: "590M" },
];

const dontMissPosts = [
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

export default function WhatsNew() {
  return (
    <div className="back-hero-area back-latest-posts back-whats-posts">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 md-pb-70">
            <div className="back-title">
              <h2>What’s New</h2>
            </div>
            <ul>
              <li>
                <div className="image-area">
                  <Link href={`/blog/those-other-collage-expenses`}>
                    <Image src={withBasePath("/assets/images/whats/1.jpg")}
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
                        Man wearing black pullover hoodie to <br /> smoke light
                        in mask his own
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
            <div className="row pt-30">
              <div className="col-lg-6">
                <ul className="back-whats-btm">
                  <li>
                    <div className="image-areas">
                      <Link href={`/blog/those-other-collage-expenses`}>
                        <Image src={withBasePath("/assets/images/whats/2.jpg")}
                          alt="image"
                  width={800}
                  height={600}
                />
                      </Link>
                      <Link
                        href="/categories/politics"
                        className="back-cate back-tra"
                      >
                        Politics
                      </Link>
                    </div>
                    <div className="back-btm-content">
                      <h3>
                        <Link href={`/blog/those-other-collage-expenses`}>
                          We have prepared 10 types of projects with more than
                          100 pages We have lots of courses and programs
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
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-lg-6 md-mt-40">
                <ul className="back-hero-bottom back-hero-bottom2">
                  {heroBottomPosts.map((post, index) => (
                    <li key={index}>
                      <div className="image-areas">
                        <Link href={`/blog/those-other-collage-expenses`}>
                          <Image src={withBasePath(post.image)} alt="image"
                  width={800}
                  height={600}
                />
                        </Link>
                      </div>
                      <div className="back-btm-content">
                        <Link
                          href={`/categories/${(post.category || "")
                            .toLowerCase()
                            .replace(/\s+/g, "-")
                            .replace(/&/g, "and")}`}
                          className="back-cates"
                        >
                          {post.category}
                        </Link>
                        <h3>
                          <Link href={`/blog/those-other-collage-expenses`}>
                            {post.title}
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
                            {post.date}
                          </li>
                        </ul>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-4 pl-30">
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
              <h2>Don’t Miss</h2>
            </div>
            <ul className="back-hero-bottom">
              {dontMissPosts.map((post, index) => (
                <li key={index}>
                  <div className="image-areas">
                    <Link href={`/blog/those-other-collage-expenses`}>
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
                      <Link href={`/blog/those-other-collage-expenses`}>
                        {post.title}
                      </Link>
                    </h3>
                    <ul>
                      <li className="back-date">
                        <Link href={`/author`}>by Jon Deo</Link>
                      </li>
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
            <a href="#" className="view-more">
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
                className="feather feather-arrow-right"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>{" "}
              View More
            </a>
            <div className="back-add">
              <Image src={withBasePath("/assets/images/whats/add.jpg")}
                alt="add-image"
                  width={800}
                  height={600}
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
