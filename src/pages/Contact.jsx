import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  useEffect(() => {
    document.title = "Contact Us | FabriTrack";
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Your message has been sent!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Contact Us
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have questions, feedback, or need support? We’re here to help you
            with FabriTrack.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Get in Touch
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Whether you are a buyer, manager, or administrator, feel free to
              reach out for any inquiries related to products, orders, or system
              functionality.
            </p>

            <ul className="space-y-4 text-gray-600 dark:text-gray-400">
              <li>
                <span className="font-semibold text-gray-800 dark:text-white">
                  Email:
                </span>{" "}
                support@fabritrack.com
              </li>
              <li>
                <span className="font-semibold text-gray-800 dark:text-white">
                  Phone:
                </span>{" "}
                +880 1XXX-XXXXXX
              </li>
              <li>
                <span className="font-semibold text-gray-800 dark:text-white">
                  Address:
                </span>{" "}
                Dhaka, Bangladesh
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none dark:bg-gray-700 dark:border-gray-600"
              />

              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Your Email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none dark:bg-gray-700 dark:border-gray-600"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Your Message"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none resize-none dark:bg-gray-700 dark:border-gray-600"
              />

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-16 text-center text-gray-500 dark:text-gray-400">
          <p>
            We value your feedback and aim to respond as quickly as possible.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
