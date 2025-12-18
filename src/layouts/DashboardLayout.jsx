import { Outlet } from "react-router";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
        <Outlet /> {/* 🔥 THIS WAS MISSING */}
      </main>
    </div>
  );
};

export default DashboardLayout;
