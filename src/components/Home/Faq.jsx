import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqs = [
  {
    question: "How long does delivery take?",
    answer:
      "Delivery usually takes 3–7 business days depending on your location.",
  },
  {
    question: "Are the fabrics comfortable for daily wear?",
    answer:
      "Yes, we select fabrics that are soft, breathable, and perfect for everyday wear.",
  },
  {
    question: "What if the size doesn’t fit?",
    answer: "You can easily return or exchange items within our 14-day policy.",
  },
  {
    question: "Can I return or exchange items?",
    answer:
      "Yes, all items are eligible for return or exchange within 14 days of delivery.",
  },
  {
    question: "Is Cash on Delivery available?",
    answer:
      "Yes, we offer Cash on Delivery for all locations within Bangladesh.",
  },
  {
    question: "Do you offer discounts for bulk orders?",
    answer:
      "Yes, please contact our support team for bulk order inquiries and discounts.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-white mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleIndex(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left text-white focus:outline-none"
              >
                <span>{faq.question}</span>
                {openIndex === index ? <FiMinus /> : <FiPlus />}
              </button>

              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-300">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
