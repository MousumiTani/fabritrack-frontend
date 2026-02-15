import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto">
        <Outlet />
      </div>

      <Footer />
    </>
  );
};

export default MainLayout;
