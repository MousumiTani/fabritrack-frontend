import { useState } from "react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import { BsGraphUp } from "react-icons/bs";
import MenuItem from "./Menu/MenuItem";
import AdminMenu from "./Menu/AdminMenu";
import SellerMenu from "./Menu/SellerMenu";
import CustomerMenu from "./Menu/CustomerMenu";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(false);

  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <>
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <button onClick={handleToggle} className="p-4 focus:outline-none">
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          w-64 bg-gray-100 flex flex-col
          transition-transform duration-200 ease-in-out
          md:translate-x-0
          ${isActive ? "-translate-x-full" : "translate-x-0"}
        `}
      >
        {/* Menu area */}
        <nav className="flex-1 px-2 py-6 space-y-1 overflow-y-auto">
          {/* Common Menu */}
          <MenuItem icon={BsGraphUp} label="Statistics" address="/dashboard" />

          {/* Role-based Menus */}
          <CustomerMenu />
          <SellerMenu />
          <AdminMenu />
        </nav>

        {/* Bottom actions */}
        <div className="border-t px-2 py-4">
          <MenuItem
            icon={FcSettings}
            label="Profile"
            address="/dashboard/profile"
          />

          <button
            onClick={logOut}
            className="flex w-full items-center px-4 py-2 mt-3 text-gray-600 hover:bg-gray-300 transition"
          >
            <GrLogout className="w-5 h-5" />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
