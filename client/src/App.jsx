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
function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_API_URL;
  const router = createBrowserRouter(
    createRoutesFromElements([
      <Route key="home" path="/">
        <Route key="default" path="" element={<Home />} />
        <Route key="login" path="/login" element={<Auth />} />
        <Route
          key="userProfile"
          path="/user/profile"
          element={<UserProfile />}
        />
        <Route key="userProfile" path="/seller/signup" element={<SignUp />} />
        <Route
          key="sellerProfile"
          path="/seller/profile"
          element={<SellerProfile />}
        />
        <Route
          key="newProduct"
          path="/seller/product/new"
          element={<NewProductRegister />}
        />
        <Route
          key="manageProudcts"
          path="/seller/product/myproducts"
          element={<ManageMyProducts />}
        />

        <Route
          key="product-list"
          path="/product-list/:nameParam"
          element={<ProductList />}
        />
        <Route key="products" path="/product/:slugId" element={<Product />} />

        <Route key="myOrders" path="/user/my-orders" element={<MyOrders />} />

        <Route
          key="buynow"
          path="/user/buy-now/:slugId/:qty"
          element={<BuyNow />}
        />
        <Route
          key="manageAddresses"
          path="/user/manage-addresses"
          element={<ManageAddress />}
        />
        <Route key="mycart" path="/user/my-cart" element={<Cart />} />
        <Route
          key="seller-dashbaord"
          path="/seller/manage-orders"
          element={<ManageOrderedProducts />}
        />
      </Route>,
    ])
  );

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
