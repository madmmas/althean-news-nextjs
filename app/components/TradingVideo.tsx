"use client";

import Image from 'next/image';
import { withBasePath } from "@/lib/basePath";
import Link from "next/link";
import { useState } from "react";
import VideoModal from "./VideoModal";

const primaryVideo = {
  image: "/assets/images/video/1.jpg",
  title:
    "Mobile's new un-carrier identity less orbit f-bombs more 5G network under sign",
  author: "Jon Deo",
  date: "March 26, 2022",
  videoUrl: "https://www.youtube.com/watch?v=e5Hc2B50Z7c",
};

const sideVideos = [
  {
    image: "/assets/images/video/2.jpg",
    category: "Travel",
    title: "My whole mind travels alone with her soul",
    videoUrl: "https://www.youtube.com/watch?v=e5Hc2B50Z7c",
  },
  {
    image: "/assets/images/video/3.jpg",
    category: "Technology",
    title: "Blue and white round soft light off rgb",
    videoUrl: "https://www.youtube.com/watch?v=e5Hc2B50Z7c",
  },
  {
    image: "/assets/images/video/4.jpg",
    category: "Fashion",
    title: "Green leaf glasses and headphones gibla",
    videoUrl: "https://www.youtube.com/watch?v=e5Hc2B50Z7c",
  },
  {
    image: "/assets/images/video/5.jpg",
    category: "Life Style",
    title: "Candy is very much in the nerves in skin",
    videoUrl: "https://www.youtube.com/watch?v=e5Hc2B50Z7c",
  },
  {
    image: "/assets/images/video/6.jpg",
    category: "Life Style",
    title: "Palenciaga and crocs team new pool style",
    videoUrl: "https://www.youtube.com/watch?v=e5Hc2B50Z7c",
  },
  {
    image: "/assets/images/video/2.jpg",
    category: "Travel",
    title: "My whole mind travels alone with her soul",
    videoUrl: "https://www.youtube.com/watch?v=e5Hc2B50Z7c",
  },
];

export default function TradingVideo() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const handleVideoClick = (e: React.MouseEvent<HTMLAnchorElement>, videoUrl: string) => {
    e.preventDefault();
    setSelectedVideo(videoUrl);
  };

  return (
    <div className="back-trading-video">
      <div className="container">
        <div className="back-title">
          <h2>Trading Video</h2>
        </div>
        <div className="row">
          <div className="col-lg-8 md-pb-70">
            <ul>
              <li>
                <div className="image-area">
                  <Link href={`/blog/those-other-collage-expenses`}>
                    <Image src={withBasePath(primaryVideo.image)} alt="image"
                  width={800}
                  height={600}
                />
                  </Link>
                  <a
                    href={primaryVideo.videoUrl}
                    className="popup-videos back-video"
                    onClick={(e) => handleVideoClick(e, primaryVideo.videoUrl)}
                  >
                    <i className="fa-solid fa-play"></i>
                  </a>
                  <div className="back-btm-content">
                    <h3>
                      <Link href={`/blog/those-other-collage-expenses`}>
                        {primaryVideo.title}
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
                        <a href="#">by {primaryVideo.author}</a>
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
                        {primaryVideo.date}
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 pl-30 md-pt-40">
            <ul className="back-hero-bottom">
              {sideVideos.map((video, index) => (
                <li key={index}>
                  <div className="image-areas">
                    <Link href={`/blog/those-other-collage-expenses`}>
                      <Image src={withBasePath(video.image)} alt="image"
                  width={800}
                  height={600}
                />
                    </Link>
                    <a
                      href={video.videoUrl}
                      className="popup-videos back-video"
                      onClick={(e) => handleVideoClick(e, video.videoUrl)}
                    >
                      <i className="fa-solid fa-play"></i>
                    </a>
                  </div>
                  <div className="back-btm-content">
                    <Link
                      href={`/categories/${video.category
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace(/&/g, "and")}`}
                      className="back-cates"
                    >
                      {video.category}
                    </Link>
                    <h3>
                      <Link href={`/blog/those-other-collage-expenses`}>
                        {video.title}
                      </Link>
                    </h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {selectedVideo && (
        <VideoModal
          isOpen={!!selectedVideo}
          videoUrl={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
}
