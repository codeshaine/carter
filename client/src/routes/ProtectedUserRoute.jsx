import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/Loader/Loader";

function ProtectedUserRoute() {
  const { isAuthenticated, loading } = useContext(AuthContext);
  if (loading) return <Loader />;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedUserRoute;
