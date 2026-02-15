import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const reviews = [
  {
    id: 1,
    name: "Arnob Rahman",
    feedback:
      "The fabric quality exceeded my expectations. Stitching and finishing were perfect. I’m very satisfied with my purchase.",
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    feedback:
      "Elegant designs and very comfortable to wear. Customer service was polite and helpful throughout.",
  },
  {
    id: 3,
    name: "Jawad Islam",
    feedback:
      "Beautiful outfits at a reasonable price. Delivery was on time and packaging was neat.",
  },
  {
    id: 4,
    name: "Sharmeen Akter",
    feedback:
      "I loved the color and fabric texture. Perfect for both casual and formal occasions.",
  },
  {
    id: 5,
    name: "Tasnim Ahmed",
    feedback:
      "Highly recommended for quality and style. I received many compliments wearing this outfit.",
  },
  {
    id: 6,
    name: "Rumana Sultana",
    feedback:
      "Very satisfied with the overall experience. Will definitely purchase again.",
  },
];

const Feedback = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-14">
      <h2 className="text-center mb-10">Customer Feedback</h2>

      <Carousel
        autoPlay
        infiniteLoop
        interval={4500}
        stopOnHover={false}
        showThumbs={false}
        showStatus={false}
        swipeable
        centerMode
        centerSlidePercentage={90}
      >
        {reviews.map((review) => (
          <div key={review.id} className="px-2">
            <div className="bg-white dark:bg-[#403530] border rounded-lg p-8 h-full">
              <p className="text-gray-700 dark:text-[#f4ead8] mb-4">
                “{review.feedback}”
              </p>
              <p className="font-medium text-gray-900 dark:text-[#f4ead8]">
                — {review.name}
              </p>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Feedback;
