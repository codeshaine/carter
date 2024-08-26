// import Footer from "../components/Footer/Footer";
// import Navbar from "../components/Navbar/Navbar";
// import { Link } from "react-router-dom";
// function Home() {
//   return (
//     <>
//       <Navbar />
//       <Link
//         to="/login"
//         className="bolder text-xl hover:text-red-500 cursor-pointer border p-2 border-black  bg-blue-400"
//       >
//         login
//       </Link>
//       <Link
//         className="bolder text-xl hover:text-red-500 cursor-pointer border p-2 border-black  bg-blue-400"
//         to="/user/profile"
//       >
//         User Profile
//       </Link>
//       <Link
//         className="bolder text-xl hover:text-red-500 cursor-pointer border p-2 border-black  bg-blue-400"
//         to="/seller/signup"
//       >
//         seller singup
//       </Link>
//       <Link
//         className="bolder text-xl hover:text-red-500 cursor-pointer border p-2 border-black  bg-blue-400"
//         to="/seller/profile"
//       >
//         seller profile
//       </Link>
//       <Link
//         className="bolder text-xl hover:text-red-500 cursor-pointer border p-2 border-black  bg-blue-400"
//         to="/seller/product/new"
//       >
//         New Product
//       </Link>
//       <Link
//         className="bolder text-xl hover:text-red-500 cursor-pointer border p-2 border-black  bg-blue-400"
//         to="/seller/product/myproducts"
//       >
//         My Products
//       </Link>
//       <Link
//         className="bolder text-xl hover:text-red-500 cursor-pointer border p-2 border-black  bg-blue-400"
//         to="/user/my-orders"
//       >
//         My Orders
//       </Link>{" "}
//       <Link
//         className="bolder text-xl hover:text-red-500 cursor-pointer border p-2 border-black  bg-blue-400"
//         to="/user/manage-addresses"
//       >
//         manage addresses
//       </Link>
//       <Link
//         className="bolder text-xl hover:text-red-500 cursor-pointer border p-2 border-black  bg-blue-400"
//         to="/user/my-cart"
//       >
//         my-cart
//       </Link>
//       <Link
//         className="bolder text-xl hover:text-red-500 cursor-pointer border p-2 border-black  bg-blue-400"
//         to="/seller/manage-orders"
//       >
//         manage orders
//       </Link>
//       <Footer />
//     </>
//   );
// }

// export default Home;

import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate("/product-list/" + searchTerm);
    console.log("Search Term:", searchTerm);
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center my-4">
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center space-x-2"
        >
          <input
            required
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search for products..."
            className="border border-gray-300 rounded-lg p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
        </form>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        <Link
          to="/login"
          className="text-xl hover:text-red-500 cursor-pointer border p-2 border-black bg-blue-400 text-white rounded-lg text-center"
        >
          Login
        </Link>
        <Link
          to="/user/profile"
          className="text-xl hover:text-red-500 cursor-pointer border p-2 border-black bg-blue-400 text-white rounded-lg text-center"
        >
          User Profile
        </Link>
        <Link
          to="/seller/signup"
          className="text-xl hover:text-red-500 cursor-pointer border p-2 border-black bg-blue-400 text-white rounded-lg text-center"
        >
          Seller Signup
        </Link>
        <Link
          to="/seller/profile"
          className="text-xl hover:text-red-500 cursor-pointer border p-2 border-black bg-blue-400 text-white rounded-lg text-center"
        >
          Seller Profile
        </Link>
        <Link
          to="/seller/product/new"
          className="text-xl hover:text-red-500 cursor-pointer border p-2 border-black bg-blue-400 text-white rounded-lg text-center"
        >
          New Product
        </Link>
        <Link
          to="/seller/product/myproducts"
          className="text-xl hover:text-red-500 cursor-pointer border p-2 border-black bg-blue-400 text-white rounded-lg text-center"
        >
          My Products
        </Link>
        <Link
          to="/user/my-orders"
          className="text-xl hover:text-red-500 cursor-pointer border p-2 border-black bg-blue-400 text-white rounded-lg text-center"
        >
          My Orders
        </Link>
        <Link
          to="/user/manage-addresses"
          className="text-xl hover:text-red-500 cursor-pointer border p-2 border-black bg-blue-400 text-white rounded-lg text-center"
        >
          Manage Addresses
        </Link>
        <Link
          to="/user/my-cart"
          className="text-xl hover:text-red-500 cursor-pointer border p-2 border-black bg-blue-400 text-white rounded-lg text-center"
        >
          My Cart
        </Link>
        <Link
          to="/seller/manage-orders"
          className="text-xl hover:text-red-500 cursor-pointer border p-2 border-black bg-blue-400 text-white rounded-lg text-center"
        >
          Manage Orders
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default Home;
