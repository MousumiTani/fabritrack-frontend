import React, { useState, useContext, useEffect } from "react";
import { NavLink, Link } from "react-router";
import AuthContext from "../context/AuthContext";
import { HiMenu, HiX } from "react-icons/hi";
import Button from "./Button";
import ThemeToggle from "./ThemeToggle";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => setTheme(checked ? "dark" : "light");
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const links = [
    { name: "Home", path: "/" },
    { name: "All Products", path: "/all-products" },
    ...(user
      ? [{ name: "Dashboard", path: "/dashboard" }]
      : [
          { name: "About Us", path: "/about-us" },
          { name: "Contact", path: "/contact" },
        ]),
  ];

  return (
    <nav className="bg-[#FFF5E6] dark:bg-[#403530] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-8 w-8 object-cover" />
            <h1 className="text-2xl font-bold text-[#5f4631] dark:text-[#f4ead8]">
              FabriTrack
            </h1>
          </div>
        </Link>

        {/*  Menu */}
        <ul className="hidden lg:flex flex-1 justify-center gap-6">
          {links.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-[#d3b89a] text-[#5f4631] dark:bg-[#6c584c] dark:text-[#f4ead8]"
                      : "text-[#5f4631] hover:text-[#8a6f4e] dark:text-[#f4ead8] dark:hover:text-[#e7d4bd]"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle checked={theme === "dark"} onChange={handleTheme} />

          {user ? (
            <>
              <div className="relative">
                <img
                  src={user.photoURL}
                  className="h-10 w-10 rounded-full cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />
                {dropdownOpen && (
                  <div className="absolute right-0 w-40 bg-[#FFD9B3] py-2 z-50 rounded-md shadow-lg">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-[#5f4631] hover:bg-[#d3b89a]"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/"
                      className="block px-4 py-2 text-[#5f4631] hover:bg-[#d3b89a]"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Settings
                    </Link>
                  </div>
                )}
              </div>
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="primary" size="md">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" size="md">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden flex items-center gap-x-4">
          <ThemeToggle checked={theme === "dark"} onChange={handleTheme} />

          <button onClick={toggleSidebar}>
            {sidebarOpen ? (
              <HiX className="w-8 h-8 text-[#5f4631] dark:text-[#f4ead8]" />
            ) : (
              <HiMenu className="w-8 h-8 text-[#5f4631] dark:text-[#f4ead8]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#FFD9B3] dark:bg-[#6c584c] z-50 transform transition-transform ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-6 border-b border-[#D9BFA7] dark:border-[#5f4631]">
          <h2 className="text-xl font-semibold text-[#5f4631] dark:text-[#f4ead8]">
            Menu
          </h2>{" "}
          <button onClick={toggleSidebar}>
            <HiX className="w-8 h-8 text-[#5f4631] dark:text-[#f4ead8]" />
          </button>
        </div>

        <ul className="flex flex-col space-y-4 mt-4 px-4">
          {links.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md transition-all duration-200 ${
                    isActive
                      ? "font-semibold text-[#FF9966]"
                      : "text-[#5f4631] hover:bg-[#FFC49B] dark:text-[#f4ead8] dark:hover:bg-[#5f4631]"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Auth Buttons for Mobile */}
        <div className="mt-8 px-4 flex flex-col space-y-4">
          {user ? (
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                logout();
                toggleSidebar();
              }}
            >
              Logout
            </Button>
          ) : (
            <>
              <Link to="/login" onClick={toggleSidebar}>
                <Button variant="primary" size="md">
                  Login
                </Button>
              </Link>
              <Link to="/register" onClick={toggleSidebar}>
                <Button variant="outline" size="md">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
