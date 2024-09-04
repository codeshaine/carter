// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";

// function Navbar() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     navigate("/product-list/" + searchTerm);
//     console.log("Search Term:", searchTerm);
//   };

//   return (
//     <nav className="flex justify-between items-center px-16 py-4 bg-gradient-to-r from-white to-slate-200 shadow-md">
//       <Link
//         to={"/"}
//         className="text-4xl font-extrabold tracking-tight flex gap-2 items-center justify-center"
//       >
//         <img className="w-16" src="/logo.png"></img>
//         <span>Carter.</span>
//       </Link>
//       <div className="flex items-center">
//         <form
//           onSubmit={handleSearchSubmit}
//           className="flex items-center bg-white rounded-md shadow-md overflow-hidden"
//         >
//           <div className="flex justify-center items-center">
//             <img src="/search.png" alt="serach_icon" className="w-11 p-1" />
//             <input
//               required
//               type="text"
//               value={searchTerm}
//               onChange={handleSearchChange}
//               placeholder="Search for products..."
//               className="p-2 w-96 focus:outline-none text-gray-700 "
//             />
//           </div>

//           {/* <button
//             type="submit"
//             className=" bg-gradient-to-r from-slate-300 to-white  px-6 py-2 rounded-r-md hover:from-white hover:to-slate-300 transition-colors"
//           >
//             Search
//           </button>*/}
//         </form>
//       </div>
//       <ul className="flex gap-6 font-semibold transition-all">
//         <li className=" hover:text-slate-500">
//           <Link
//             className="flex justify-center items-center gap-1"
//             to="/user/profile"
//           >
//             <img className="w-10" src="/user.png"></img>
//             <span>User</span>
//           </Link>
//         </li>
//         <li className=" hover:text-slate-500">
//           <Link
//             className="flex justify-center items-center gap-1"
//             to="/seller/profile"
//           >
//             <img className="w-10" src="/shop.png"></img>
//             <span>Seller</span>
//           </Link>
//         </li>
//         <li className=" hover:text-slate-500">
//           <Link
//             className="flex justify-center items-center gap-1"
//             to="/user/my-cart"
//           >
//             <img className="w-10" src="/cart.png"></img>
//             <span>Cart</span>
//           </Link>
//         </li>
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState({
    user: false,
    seller: false,
  });
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
    <nav className="flex justify-between items-center px-16 py-4 bg-gradient-to-r from-white to-slate-200 shadow-md">
      <Link
        to={"/"}
        className="text-4xl font-extrabold tracking-tight flex gap-2 items-center justify-center"
      >
        <img className="w-16" src="/logo.png" alt="Logo" />
        <span>Carter.</span>
      </Link>
      <div className="flex items-center">
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center bg-white rounded-md shadow-md overflow-hidden"
        >
          <div className="flex justify-center items-center">
            <img src="/search.png" alt="Search Icon" className="w-11 p-1" />
            <input
              required
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search for products..."
              className="p-2 w-96 focus:outline-none text-gray-700"
            />
          </div>
        </form>
      </div>
      <ul className="flex gap-6 font-semibold transition-all relative">
        <li
          className="relative"
          onMouseEnter={() =>
            setShowDropdown((prev) => ({ ...prev, user: true }))
          }
          onMouseLeave={() =>
            setShowDropdown((prev) => ({ ...prev, user: false }))
          }
        >
          <Link className="flex justify-center items-center gap-1 hover:text-slate-500">
            <img className="w-10" src="/user.png" alt="User Icon" />
            <span>User</span>
          </Link>
          {showDropdown.user && (
            <div className="absolute top-full -mt-1 left-0 bg-gray-100 text-gray-800 border border-gray-300 rounded-md shadow-lg w-28 transition-opacity duration-300 opacity-100">
              <Link
                to="/user/profile"
                className="block px-4 py-2 hover:bg-gray-200 hover:underline"
              >
                Profile
              </Link>
              <Link
                to="/user/manage-addresses"
                className="block px-4 py-2 hover:bg-gray-200 hover:underline"
              >
                Manage Address
              </Link>
              <Link
                to="/user/my-orders"
                className="block px-4 py-2 hover:bg-gray-200 hover:underline"
              >
                My Orders
              </Link>
            </div>
          )}
        </li>
        <li
          className="relative"
          onMouseEnter={() =>
            setShowDropdown((prev) => ({ ...prev, seller: true }))
          }
          onMouseLeave={() =>
            setShowDropdown((prev) => ({ ...prev, seller: false }))
          }
        >
          <Link className="flex justify-center items-center gap-1 hover:text-slate-500">
            <img className="w-10" src="/shop.png" alt="Shop Icon" />
            <span>Seller</span>
          </Link>
          {showDropdown.seller && (
            <div className="absolute top-full -mt-1 left-0 bg-gray-100 text-gray-800 border border-gray-300 rounded-md shadow-lg w-36 transition-opacity duration-300 opacity-100">
              <Link
                to="/seller/profile"
                className="block px-4 py-2 hover:bg-gray-200 hover:underline"
              >
                Profile
              </Link>
              <Link
                to="/seller/product/new"
                className="block px-4 py-2 hover:bg-gray-200 hover:underline"
              >
                New Product
              </Link>
              <Link
                to="/seller/product/myproducts"
                className="block px-4 py-2 hover:bg-gray-200 hover:underline"
              >
                My Products
              </Link>
              <Link
                to="/seller/manage-orders"
                className="block px-4 py-2 hover:bg-gray-200 hover:underline"
              >
                Manage Orders
              </Link>
            </div>
          )}
        </li>
        <li className="hover:text-slate-500">
          <Link
            className="flex justify-center items-center gap-1"
            to="/user/my-cart"
          >
            <img className="w-10" src="/cart.png" alt="Cart Icon" />
            <span>Cart</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
