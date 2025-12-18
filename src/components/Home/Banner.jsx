import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router";

import bannerImg1 from "../../assets/banner1.jpg";
import bannerImg2 from "../../assets/banner2.jpg";
import bannerImg3 from "../../assets/banner3.jpg";

const Banner = () => {
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
      {/* Slide 1 */}
      <div className="relative">
        <img
          src={bannerImg1}
          alt="New Collection"
          className="max-h-[500px] w-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-end justify-center p-12">
          <div className="text-center text-white px-4">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              New Collection
            </h2>
            <Link to="/shop">
              <button className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="relative">
        <img
          src={bannerImg2}
          alt="Exclusive Designs"
          className="max-h-[500px] w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40 flex items-end p-12 justify-center">
          <div className="text-center text-white px-4">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Exclusive Designs
            </h2>
            <Link to="/collections">
              <button className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition">
                Explore
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="relative">
        <img
          src={bannerImg3}
          alt="Summer Sale"
          className="max-h-[500px] w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40 flex items-end p-12 justify-center">
          <div className="text-center text-white px-4">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Summer Sale</h2>
            <Link to="/offers">
              <button className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition">
                View Offers
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Carousel>
  );
};

export default Banner;
