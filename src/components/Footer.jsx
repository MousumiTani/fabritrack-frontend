import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../assets/logo.png";

const socialLinks = [
  { name: "Facebook", icon: FaFacebookF, url: "https://facebook.com/" },
  { name: "Instagram", icon: FaInstagram, url: "https://instagram.com/" },
  { name: "LinkedIn", icon: FaLinkedinIn, url: "https://linkedin.com/" },
  { name: "Twitter", icon: FaXTwitter, url: "https://twitter.com/" },
];

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "All Products", path: "/all-products" },
  { name: "About Us", path: "/about-us" },
  { name: "Contact", path: "/contact" },
  { name: "Dashboard", path: "/dashboard" },
];

const Footer = () => {
  const iconBox =
    "flex items-center justify-center h-9 w-9 rounded-full bg-[#d3b89a] dark:bg-[#6c584c] hover:opacity-80 transition";
  const iconClass = "text-lg";

  return (
    <footer className="bg-[#FFF5E6] dark:bg-[#403530] text-[#5f4631] dark:text-[#f4ead8] mt-10">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={logo} alt="FabriTrack logo" className="h-10 w-10" />
              <h2 className="text-2xl font-bold">FabriTrack</h2>
            </div>
            <p className="text-sm leading-6 max-w-xs">
              Smart garment inventory & tracking system designed for smooth,
              fast, and organized factory workflow.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map(({ name, path }) => (
                <li key={name}>
                  <Link to={path} className="hover:underline">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Connect</h3>
            <div className="flex gap-3">
              {socialLinks.map(({ name, icon, url }) => {
                const SocialIcon = icon;
                return (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className={iconBox}
                  >
                    <SocialIcon className={iconClass} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="py-4">
            <p className="text-sm">
              © {new Date().getFullYear()} All rights reserved.
            </p>
            <p className="text-sm opacity-80">
              Built for modern garment workflow.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
