import React, { useEffect } from "react";

const AboutUs = () => {
  useEffect(() => {
    document.title = "About Us | FabriTrack";
  }, []);

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            About FabriTrack
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A modern garment management and purchasing platform designed to
            connect managers and buyers in a seamless, efficient way.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              What is FabriTrack?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              FabriTrack is a role-based web platform built for managing garment
              products and simplifying the buying process. It allows managers to
              list and maintain products while enabling buyers to browse,
              purchase, and track their orders with ease.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              The system is designed with clear role separation to ensure
              security, accountability, and a smooth workflow between different
              users of the platform.
            </p>
          </div>

          {/* Right */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Platform Roles
            </h3>

            <ul className="space-y-4 text-gray-600 dark:text-gray-400">
              <li>
                <span className="font-semibold text-gray-800 dark:text-white">
                  Admin:
                </span>{" "}
                Manages the entire platform, controls user roles, monitors
                activity, and ensures the system operates smoothly.
              </li>

              <li>
                <span className="font-semibold text-gray-800 dark:text-white">
                  Manager:
                </span>{" "}
                Responsible for adding, updating, and managing garment products,
                stock levels, and product information.
              </li>

              <li>
                <span className="font-semibold text-gray-800 dark:text-white">
                  Buyer:
                </span>{" "}
                Can browse available products, place orders, and manage their
                purchase history through a user-friendly interface.
              </li>
            </ul>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-8">
            Why Choose FabriTrack?
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-2">
                Role-Based Access
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Secure role management ensures that admins, managers, and buyers
                only access features relevant to them.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-2">
                Efficient Product Management
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Managers can easily add, update, and organize garment products
                with real-time availability.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-2">
                Seamless Buying Experience
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Buyers enjoy a smooth browsing and ordering experience with
                clear product details and order tracking.
              </p>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-16 text-center text-gray-500 dark:text-gray-400">
          <p>
            FabriTrack is built with scalability, security, and usability in
            mind — making it suitable for real-world garment management
            solutions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
