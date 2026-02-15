import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // While auth is loading, show nothing (or a spinner)
  if (loading) return <p className="text-center mt-10">Checking login...</p>;

  // Not logged in → redirect
  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default PrivateRoute;
