import { Navigate } from "react-router";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import PrivateRoute from "./PrivateRoute";

const BuyerRoute = ({ children }) => {
  const { role, loading } = useContext(AuthContext);

  if (loading) return null;

  if (role !== "buyer") {
    return <Navigate to="/unauthorized" replace />;
  }

  return <PrivateRoute>{children}</PrivateRoute>;
};

export default BuyerRoute;
