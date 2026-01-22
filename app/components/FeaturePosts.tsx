import Image from 'next/image';
import { withBasePath } from "@/lib/basePath";
import Link from "next/link";

const featurePosts = [
  {
    image: "/assets/images/feature/1.jpg",
    categoryClass: "back-cate back-tra",
    category: "Travel",
    title: "Skydivers in freefall scare after getting tangled up in mid-air",
    excerpt:
      "Congue eligendi excepteur hac nascetur morbi exercita tion ducimus, quae eaexce pturer lander balrola...",
    date: "March 26, 2022",
  },
  {
    image: "/assets/images/feature/2.jpg",
    categoryClass: "back-cate back-tech2",
    category: "Technology",
    title: "Heineken launches virtual beer in self-mocking metaverse joke",
    excerpt:
      "Congue eligendi excepteur hac nascetur morbi exercita tion ducimus, quae eaexce pturer lander balrola...",
    date: "March 26, 2022",
  },
  {
    image: "/assets/images/feature/3.jpg",
    categoryClass: "back-cate back-tech",
    category: "Environment",
    title:
      "Industrial pollution are importede straws to have cost implications",
    excerpt:
      "Congue eligendi excepteur hac nascetur morbi exercita tion ducimus, quae eaexce pturer lander balrola...",
    date: "March 26, 2022",
  },
  {
    image: "/assets/images/feature/4.jpg",
    categoryClass: "back-cate back-fashion",
    category: "ADVENTURE",
    title: "Ready for discover sea diving position fall nation area",
    excerpt:
      "Congue eligendi excepteur hac nascetur morbi exercita tion ducimus, quae eaexce pturer lander balrola...",
    date: "March 26, 2022",
  },
  {
    image: "/assets/images/feature/5.jpg",
    categoryClass: "back-cate back-poli",
    category: "Politics",
    title: "If you destroy the earth, you dstroy the chance of life once more",
    excerpt:
      "Congue eligendi excepteur hac nascetur morbi exercita tion ducimus, quae eaexce pturer lander balrola...",
    date: "April 25, 2022",
  },
];

const categories = [
  { image: "/assets/images/category/1.jpg", total: "10", label: "Travel" },
  { image: "/assets/images/category/2.jpg", total: "19", label: "Technology" },
  { image: "/assets/images/category/3.jpg", total: "15", label: "Food" },
  { image: "/assets/images/category/4.jpg", total: "20", label: "Fashion" },
  { image: "/assets/images/category/5.jpg", total: "22", label: "Life Style" },
  { image: "/assets/images/category/6.jpg", total: "18", label: "Adventure" },
];

const mostRead = [
  {
    image: "/assets/images/read/1.jpg",
    category: "Politics",
    title: "Save the earth, save a life no earth, no life health.",
  },
  {
    image: "/assets/images/read/2.jpg",
    category: "Technology",
    title: "Anyone can hold the helm the when sea is calm.",
  },
  {
    image: "/assets/images/read/3.jpg",
    category: "Fashion",
    title: "In somnia non is here for sleeping at all",
  },
  {
    image: "/assets/images/read/4.jpg",
    category: "Life Style",
    title: "Male traveler on Iceland explores waterfall",
  },
];

export default function FeaturePosts() {
  return (
    <div className="back-hero-area back-latest-posts back-whats-posts back-feature-posts">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 md-pb-70">
            <div className="back-title">
              <h2>Feature Posts</h2>
            </div>
            <ul className="back-hero-bottom back-hero-bottom2">
              {featurePosts.map((post, index) => (
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
                      className={post.categoryClass}
                    >
                      {post.category}
                    </Link>
                    <h3>
                      <Link href={`/blog/those-other-collage-expenses`}>
                        {post.title}
                      </Link>
                    </h3>
                    <p>{post.excerpt}</p>
                    <ul className="back-meta">
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
                        {post.date}
                      </li>
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
            <div className="text-center pt-73 md-pt-30">
              <Link href={`/blog`} className="back-btn">
                View All Posts
              </Link>
            </div>
          </div>
          <div className="col-lg-4 pl-30">
            <div className="back-title back-small-title">
              <h2>Categories</h2>
            </div>
            <ul className="back-category-area">
              {categories.map((item, index) => (
                <li key={index}>
                  <div>
                    <Image src={withBasePath(item.image)} alt="Category Image"
                  width={800}
                  height={600}
                />
                    <Link href={`/categories/${item.label.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")}`}>
                      <span>
                        <em>{item.total}</em> {item.label}
                      </span>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
            <div className="back-title back-small-title pt-30">
              <h2>Most Read</h2>
            </div>
            <ul className="back-hero-bottom">
              {mostRead.map((item, index) => (
                <li key={index}>
                  <div className="image-areas">
                    <Link href={`/blog/those-other-collage-expenses`}>
                      <Image src={withBasePath(item.image)} alt="image"
                  width={800}
                  height={600}
                />
                    </Link>
                  </div>
                  <div className="back-btm-content">
                    <Link
                      href={`/categories/${item.category
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace(/&/g, "and")}`}
                      className="back-cates"
                    >
                      {item.category}
                    </Link>
                    <h3>
                      <Link href={`/blog/those-other-collage-expenses`}>
                        {item.title}
                      </Link>
                    </h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
