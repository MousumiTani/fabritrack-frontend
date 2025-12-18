import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#FFF5E6] dark:bg-[#403530] text-[#5f4631] dark:text-[#f4ead8] mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src={logo} alt="Logo" className="h-10 w-10 object-cover" />
            <h2 className="text-2xl font-bold">FabriTrack</h2>
          </div>
          <p className="text-sm leading-6">
            Your smart garment inventory & tracking companion. Designed to keep
            your workflow smooth, fast, and organized.
          </p>

          {/* Social Links */}
          <div className="flex gap-4 mt-4">
            <a
              href="#"
              className="p-2 rounded-full bg-[#d3b89a] dark:bg-[#6c584c] hover:opacity-80 transition"
            >
              <FaFacebookF className="text-[#5f4631] dark:text-[#f4ead8] text-lg" />
            </a>

            <a
              href="#"
              className="p-2 rounded-full bg-[#d3b89a] dark:bg-[#6c584c] hover:opacity-80 transition"
            >
              <FaInstagram className="text-[#5f4631] dark:text-[#f4ead8] text-lg" />
            </a>

            <a
              href="#"
              className="p-2 rounded-full bg-[#d3b89a] dark:bg-[#6c584c] hover:opacity-80 transition"
            >
              <FaLinkedinIn className="text-[#5f4631] dark:text-[#f4ead8] text-lg" />
            </a>

            {/* Twitter X */}
            <a
              href="#"
              className="p-2 rounded-full bg-[#d3b89a] dark:bg-[#6c584c] hover:opacity-80 transition"
            >
              <FaXTwitter className="text-[#5f4631] dark:text-[#f4ead8] text-lg" />
            </a>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/all-products" className="hover:underline">
                All Products
              </Link>
            </li>
            <li>
              <Link to="/about-us" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:underline">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Copyright */}
        <div className="flex flex-col justify-center md:items-end">
          <p className="text-sm">
            © {new Date().getFullYear()} FabriTrack. All Rights Reserved.
          </p>
          <p className="text-xs mt-1 opacity-80">
            Crafted with care for smooth factory workflow.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
