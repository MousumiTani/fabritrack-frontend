import { Navigate } from "react-router";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import PrivateRoute from "./PrivateRoute";

const AdminRoute = ({ children }) => {
  const { role, loading } = useContext(AuthContext);

  // ⏳ wait for auth + role
  if (loading) return null;

  // 🔒 not admin → block
  if (role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ logged in + admin
  return <PrivateRoute>{children}</PrivateRoute>;
};

export default AdminRoute;
