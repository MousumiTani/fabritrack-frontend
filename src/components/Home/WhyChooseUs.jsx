import React from "react";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const WhyChooseUs = () => {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-semibold text-center mb-10"
        >
          Why Choose Us
        </motion.h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Premium Quality Fabric",
              desc: "We carefully select fabrics that feel comfortable, last long, and look elegant.",
            },
            {
              title: "Comfortable Fit",
              desc: "Designed for everyday wear with ease, movement, and confidence in mind.",
            },
            {
              title: "Honest Pricing",
              desc: "Fair prices without compromising quality — no hidden costs.",
            },
            {
              title: "Customer Support",
              desc: "We’re always here to help you before and after your purchase.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.7 }}
              className="border rounded-lg p-6 text-center"
            >
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
