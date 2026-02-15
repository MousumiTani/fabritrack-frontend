// Sidebar.jsx
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";

import AdminMenu from "./Menu/AdminMenu";
import ManagerMenu from "./Menu/ManagerMenu";
import BuyerMenu from "./Menu/BuyerMenu";

const Sidebar = () => {
  const { role, loading } = useContext(AuthContext);

  if (loading) return null; // Wait until auth is loaded

  return (
    <aside
      className="
        w-64 bg-white dark:bg-gray-800 
        flex flex-col
        transition-transform duration-300
        md:translate-x-0
      "
    >
      <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
        {/* Admin Menu */}
        {role === "admin" && (
          <div>
            <p className="mb-2 text-xs font-semibold text-gray-400 uppercase">
              Admin
            </p>
            <div className="space-y-1">
              <AdminMenu />
            </div>
          </div>
        )}

        {/* Manager Menu */}
        {role === "manager" && (
          <div>
            <p className="mb-2 text-xs font-semibold text-gray-400 uppercase">
              Manager
            </p>
            <div className="space-y-1">
              <ManagerMenu />
            </div>
          </div>
        )}

        {/* Buyer Menu */}
        {role === "buyer" && (
          <div>
            <p className="mb-2 text-xs font-semibold text-gray-400 uppercase">
              Buyer
            </p>
            <div className="space-y-1">
              <BuyerMenu />
            </div>
          </div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
