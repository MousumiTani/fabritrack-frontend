import React from "react";
import { Outlet } from "react-router";

const SimpleLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Outlet />
    </div>
  );
};

export default SimpleLayout;
