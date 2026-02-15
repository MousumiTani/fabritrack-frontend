import { Outlet, Navigate, useLocation } from "react-router";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";

const DashboardLayout = () => {
  const { role, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return null;

  // Role-based default page
  let defaultPage = "/dashboard/profile";
  if (role === "buyer") defaultPage = "/dashboard/my-orders";
  if (role === "manager") defaultPage = "/dashboard/add-product";
  if (role === "admin") defaultPage = "/dashboard/all-orders";

  // If user is exactly at /dashboard, redirect to default page
  if (location.pathname === "/dashboard") {
    return <Navigate to={defaultPage} replace />;
  }

  return (
    <div className="h-screen flex">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
