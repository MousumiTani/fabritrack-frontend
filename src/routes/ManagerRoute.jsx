import { Navigate } from "react-router";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import PrivateRoute from "./PrivateRoute";

const ManagerRoute = ({ children }) => {
  const { role, loading } = useContext(AuthContext);

  // ⏳ wait until auth is ready
  if (loading) return null;

  // 🔒 not manager → block
  if (role !== "manager") {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ logged in + manager
  return <PrivateRoute>{children}</PrivateRoute>;
};

export default ManagerRoute;
