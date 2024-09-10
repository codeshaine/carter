import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/Loader/Loader";

function ProtectedSellerRoutes() {
  const { isSeller, loading } = useContext(AuthContext);
  if (loading) return <Loader />;
  return isSeller ? <Outlet /> : <Navigate to="/seller/signup" />;
}

export default ProtectedSellerRoutes;
