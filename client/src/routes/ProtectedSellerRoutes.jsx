import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedSellerRoutes() {
  const { isSeller } = useContext(AuthContext);
  return isSeller ? <Outlet /> : <Navigate to="/seller/signup" />;
}

export default ProtectedSellerRoutes;
