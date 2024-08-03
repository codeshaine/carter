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

        {/* <Route key="specific" path="specific/:eventid" element={<Specific />} /> */}
      </Route>,
    ])
  );

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
