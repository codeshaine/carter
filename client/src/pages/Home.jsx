import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import { Link } from "react-router-dom";
function Home() {
  return (
    <>
      <Navbar />

      <Link
        to="/login"
        className="bolder text-xl hover:text-red-500 cursor-pointer border p-2 border-black  bg-blue-400"
      >
        login
      </Link>
      <Link
        className="bolder text-xl hover:text-red-500 cursor-pointer border p-2 border-black  bg-blue-400"
        to="/user/profile"
      >
        User Profile
      </Link>
      <Link
        className="bolder text-xl hover:text-red-500 cursor-pointer border p-2 border-black  bg-blue-400"
        to="/seller/signup"
      >
        seller singup
      </Link>
      <Link
        className="bolder text-xl hover:text-red-500 cursor-pointer border p-2 border-black  bg-blue-400"
        to="/seller/profile"
      >
        seller profile
      </Link>
      <Link
        className="bolder text-xl hover:text-red-500 cursor-pointer border p-2 border-black  bg-blue-400"
        to="/seller/product/new"
      >
        New Product
      </Link>
      <Footer />
    </>
  );
}

export default Home;
