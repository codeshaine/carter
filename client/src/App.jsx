import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import axios from "axios"; // Import axios library
import "./index.css";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import UserProfile from "./pages/user/UserProfile";
import SignUp from "./pages/seller/SignUp";
import SellerProfile from "./pages/seller/SellerProfile";
import NewProductRegister from "./pages/seller/NewProductRegister";
import ManageMyProducts from "./pages/seller/ManageMyProducts";
import Product from "./pages/Product";
import MyOrders from "./pages/user/MyOrders";
import BuyNow from "./pages/user/BuyNow";
import ManageAddress from "./pages/user/ManageAddress";
import Cart from "./pages/user/Cart";
import ManageOrderedProducts from "./pages/seller/ManageOrderedProducts";
import ProductList from "./pages/ProductList";
import { AuthProvider } from "./context/AuthContext";
import ProtectedUserRoute from "./routes/ProtectedUserRoute";
import ProtectedSellerRoutes from "./routes/ProtectedSellerRoutes";
import GlobalError from "./pages/GlobalError";
function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_API_URL;
  const router = createBrowserRouter(
    createRoutesFromElements([
      <Route key="global" path="/">
        <Route key="home" path="" element={<Home />} />
        <Route key="login" path="/login" element={<Auth />} />
        <Route key="sellerSignup" path="/seller/signup" element={<SignUp />} />
        {/********************************** user routes **************************************/}
        <Route path="user" element={<ProtectedUserRoute />}>
          <Route key="userProfile" path="profile" element={<UserProfile />} />
          <Route key="myOrders" path="my-orders" element={<MyOrders />} />
          <Route
            key="buynow"
            path="buy-now/:slugId/:qty"
            element={<BuyNow />}
          />
          <Route key="mycart" path="my-cart" element={<Cart />} />
          <Route
            key="manageAddresses"
            path="manage-addresses"
            element={<ManageAddress />}
          />
        </Route>

        {/********************************** seller routes **************************************/}
        <Route path="seller" element={<ProtectedSellerRoutes />}>
          <Route
            key="sellerProfile"
            path="profile"
            element={<SellerProfile />}
          />
          <Route
            key="newProduct"
            path="product/new"
            element={<NewProductRegister />}
          />
          <Route
            key="manageProudcts"
            path="product/myproducts"
            element={<ManageMyProducts />}
          />
          <Route
            key="seller-dashbaord"
            path="manage-orders"
            element={<ManageOrderedProducts />}
          />
        </Route>

        {/********************************** prpduct routes **************************************/}
        <Route
          key="product-list"
          path="/product-list/:nameParam"
          element={<ProductList />}
        />
        <Route key="products" path="/product/:slugId" element={<Product />} />
        <Route key="gloabal-error" path="*" element={<GlobalError />} />
      </Route>,
    ])
  );

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
