import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router";
import Button from "../Shared/Button";

import bannerImg1 from "../../assets/banner1.jpg";
import bannerImg2 from "../../assets/banner2.jpg";
import bannerImg3 from "../../assets/banner3.jpg";

const slides = [
  {
    img: bannerImg1,
    title: "New Collection",
    CTA: "Shop Now",
  },
  {
    img: bannerImg2,
    title: "Exclusive Designs",
    CTA: "Explore",
  },
  {
    img: bannerImg3,
    title: "Summer Sale",
    CTA: "Shop Now",
  },
];

const Banner = () => {
  const overlay =
    "absolute inset-0 bg-black/40 flex items-end justify-center p-12";
  const imgClass = "max-h-[600px] w-full object-cover";

  return (
    <Carousel
      autoPlay
      infiniteLoop
      interval={3000}
      showThumbs={false}
      showStatus={false}
      swipeable
      emulateTouch
    >
      {slides.map(({ img, title, CTA }, idx) => (
        <div key={idx} className="relative">
          <img src={img} alt={title} className={imgClass} />

          <div className={overlay}>
            <div className="text-center space-y-2">
              <h2>{title}</h2>
              <Link to="/all-products">
                <Button variant="neutral" size="md">
                  {CTA}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;
