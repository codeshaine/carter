  import { Link, useNavigate } from "react-router-dom";
  import { memo, useContext, useState } from "react";
  import { AuthContext } from "../../context/AuthContext";

  const Navbar = memo(function Navbar() {
    const [searchTerm, setSearchTerm] = useState("");
    const [showDropdown, setShowDropdown] = useState({
      user: false,
      seller: false,
    });
    const { user, isAuthenticated, seller, isSeller } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
      e.preventDefault();
      navigate("/product-list/" + searchTerm);
    };

    return (
      <nav className="grid lg:grid-cols-3 grid-cols-2 gap-3 lg:gap-40 lg:justify-between lg:items-center  lg:py-6  px-5 py-4  bg-gradient-to-r from-white to-slate-200 shadow-md">
        <Link
          to={"/"}
          className="lg:text-4x sm:text-2xl lg:pr-16 pr-6 font-extrabold tracking-tight flex lg:gap-2 gap-1 items-center justify-center lg:order-1"
        >
          <img className="lg:w-16 w-10" src="/logo.png" alt="Logo" />
          <span className="lg:text-5xl text-4xl">Carter.</span>
        </Link>

        <div className="flex items-center justify-center col-span-2 lg:col-span-1 lg:order-2 order-3">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center bg-white rounded-md shadow-md overflow-hidden"
          >
            <div className="flex justify-center w-full lg:w-screen items-center lg:px-2 px-4">
              <img src="/search.png" alt="Search Icon" className="lg:w-12 w-10" />
              <input
                required
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search for products..."
                className="lg:py-2 lg:px-4 lg:w-96 w-86 p-3 lg:text-xl text-base lg:h-12 focus:outline-none text-gray-700"
              />
            </div>
          </form>
        </div>
        <ul className="flex gap-2 lg:gap-4 lg:order-3 pl-10 lg:pl-0 font-semibold transition-all relative">
          <li
            className="relative"
            onMouseEnter={() =>
              setShowDropdown((prev) => ({ ...prev, user: true }))
            }
            onMouseLeave={() =>
              setShowDropdown((prev) => ({ ...prev, user: false }))
            }
          >
            <Link className="flex justify-center items-center  hover:text-slate-500">
              <img className="lg:w-12 w-10" src="/user.png" alt="User Icon" />
              <span className="lg:text-xl text-base lg:block hidden">
                {isAuthenticated ? user.name : "User"}
              </span>
            </Link>
            {showDropdown.user && (
              <div className="absolute z-50 top-full lg:-mt-1 lg:left-0 lg:w-36 w-28 bg-gray-100 text-gray-800 border border-gray-300 rounded-md shadow-lg  transition-opacity duration-300 opacity-100">
                <Link
                  to="/user/profile"
                  className="block px-2 py-1 lg:px-4 lg:py-2 hover:bg-gray-200 hover:underline"
                >
                  Profile
                </Link>
                <Link
                  to="/user/manage-addresses"
                  className="block px-2 py-1 lg:px-4 lg:py-2  hover:bg-gray-200 hover:underline"
                >
                  Manage Address
                </Link>
                <Link
                  to="/user/my-orders"
                  className="block px-2 py-1 lg:px-4 lg:py-2 hover:bg-gray-200 hover:underline"
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
              <img className="lg:w-12 w-10" src="/shop.png" alt="Shop Icon" />
              <span className="lg:text-xl text-base hidden lg:block">
                {isSeller ? seller : "seller"}
              </span>
            </Link>
            {showDropdown.seller && (
              <div className="absolute z-50 top-full lg:-mt-1 left-0 lg:w-36 w-28 bg-gray-100 text-gray-800 border border-gray-300 rounded-md shadow-lg transition-opacity duration-300 opacity-100">
                <Link
                  to="/seller/profile"
                  className="block lg:px-4 px-2 py-1 hover:bg-gray-200 hover:underline"
                >
                  Profile
                </Link>
                <Link
                  to="/seller/product/new"
                  className="block lg:px-4 px-2 py-1 hover:bg-gray-200 hover:underline"
                >
                  New Product
                </Link>
                <Link
                  to="/seller/product/myproducts"
                  className="block lg:px-4 lg:py-2 px-2 py-1 hover:bg-gray-200 hover:underline"
                >
                  My Products
                </Link>
                <Link
                  to="/seller/manage-orders"
                  className="block  px-2 lg:px-4 py-1 hover:bg-gray-200 hover:underline"
                >
                  Manage Orders
                </Link>
              </div>
            )}
          </li>
          <li className="hover:text-slate-500 ">
            <Link
              className="flex justify-center items-center gap-1"
              to="/user/my-cart"
            >
              <img className="lg:w-12 w-10" src="/cart.png" alt="Cart Icon" />
              <span className="lg:text-xl text-base lg:block hidden">Cart</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  });

  export default Navbar;
