import Image from 'next/image';
import { withBasePath } from "@/lib/basePath";
import Link from "next/link";
import BlogSearchForm from "./BlogSearchForm";

const latestNews = [
  {
    image: "/assets/images/dont/1.jpg",
    category: "Politics",
    title: "Time can never stop for anyone",
    author: "Jon Deo",
  },
  {
    image: "/assets/images/dont/2.jpg",
    category: "Music",
    title: "Everyone loves to listen to music",
    author: "Jon Deo",
  },
  {
    image: "/assets/images/dont/3.jpg",
    category: "Lifestyle",
    title: "10 easy habits to make your life",
    author: "Jon Deo",
  },
  {
    image: "/assets/images/dont/4.jpg",
    category: "Travel",
    title: "World tranding best 10 website",
    author: "Jon Deo",
  },
];

const recentComments = [
  {
    image: "/assets/images/author/1.jpg",
    name: "John Doe",
    date: "14 January, 2022",
    text: "Having no content in  post should have adverse..",
  },
  {
    image: "/assets/images/author/2.jpg",
    name: "Jane Smith",
    date: "15 January, 2022",
    text: "Great article! Thanks for sharing this...",
  },
  {
    image: "/assets/images/author/3.jpg",
    name: "Mike Johnson",
    date: "16 January, 2022",
    text: "I found this very helpful and informative.",
  },
];

export default function BlogSidebar() {
  return (
    <div className="back-sidebar pl-30 md-pl-0 back-hero-area back-latest-posts back-whats-posts">
      <BlogSearchForm />
      <div className="back-title back-small-title">
        <h2>Get in Touch</h2>
      </div>
      <ul className="social-area">
        <li>
          <div>
            <a href="#">
              <i className="fa-brands fa-facebook-f"></i>
            </a>{" "}
            <span>
              Followers <em>750</em>
            </span>
          </div>
        </li>
        <li>
          <div>
            <a href="#">
              <i className="fa-brands fa-twitter"></i>
            </a>{" "}
            <span>
              Fans <em>1236</em>
            </span>
          </div>
        </li>
        <li>
          <div>
            <a href="#">
              <i className="fa-brands fa-instagram"></i>
            </a>{" "}
            <span>
              Likes <em>523</em>
            </span>
          </div>
        </li>
        <li>
          <div>
            <a href="#">
              <i className="fa-brands fa-vimeo-v"></i>
            </a>{" "}
            <span>
              Comments <em>790</em>
            </span>
          </div>
        </li>
        <li>
          <div>
            <a href="#">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>{" "}
            <span>
              Followers <em>1025</em>
            </span>
          </div>
        </li>
        <li>
          <div>
            <a href="#">
              <i className="fa-brands fa-youtube"></i>
            </a>{" "}
            <span>
              Subscribers <em>590M</em>
            </span>
          </div>
        </li>
      </ul>
      <div className="back-title back-small-title pt-30">
        <h2>Latest News</h2>
      </div>
      <ul className="back-hero-bottom">
        {latestNews.map((news, index) => (
          <li key={index}>
            <div className="image-areas">
              <a href="#">
                <Image src={withBasePath(news.image)} alt="image"
                  width={800}
                  height={600}
                />
              </a>
            </div>
            <div className="back-btm-content">
              <Link
                href={`/categories/${news.category
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/&/g, "and")}`}
                className="back-cates"
              >
                {news.category}
              </Link>
              <h3>
                <a href="#">{news.title}</a>
              </h3>
              <ul>
                <li className="back-date">
                  by <a href="#">{news.author}</a>
                </li>
              </ul>
            </div>
          </li>
        ))}
      </ul>
      <div className="back-add pt-15">
        <Image src={withBasePath("/assets/images/whats/add.jpg")}
          alt="add-image"
                  width={800}
                  height={600}
                />
      </div>
      <div className="back-title back-small-title pt-50">
        <h2>Follow Us</h2>
      </div>
      <ul className="back-instragram">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <li key={num}>
            <a href="#">
              <Image src={withBasePath(`/assets/images/instragram/${num}.jpg`)}
                alt="image"
                  width={800}
                  height={600}
                />
              <i className="fa-brands fa-instagram"></i>
            </a>
          </li>
        ))}
      </ul>
      <div className="back-title back-small-title pt-50">
        <h2>Comments</h2>
      </div>
      <div className="widget back-recent-comments">
        <ul className="recent-comments">
          {recentComments.map((comment, index) => (
            <li key={index}>
              <span className="post-images">
                <Image src={withBasePath(comment.image)} alt="post"
                  width={800}
                  height={600}
                />
              </span>
              <div className="titles">
                <h4>{comment.name}</h4>
                <span>{comment.date}</span>
                <p>{comment.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
