// import axios from "axios";
// import { useEffect, useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import { useNavigate, Link } from "react-router-dom";

// function Cart() {
//   const [cartItems, setCartItems] = useState([]);
//   const [userAddresses, setUserAddresses] = useState([]);
//   const [chosenAddress, setChoosenAddress] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     (async () => {
//       try {
//         const res1 = await axios.get("/api/user/product/my-cart");
//         const res2 = await axios.get("/api/user/address");
//         setUserAddresses(res2.data.data);
//         setCartItems(res1.data.data.items);
//       } catch (err) {
//         if (err.response.status === 401) navigate("/login");
//         console.error(err.response.data.message);
//       }
//     })();
//   }, [navigate]);

//   const orderNow = async () => {
//     try {
//       const res = await axios.post("/api/user/product/cart/order-now", {
//         userAddress: chosenAddress,
//       });
//       toast.success(res.data.message);
//     } catch (err) {
//       toast.error(err.response.data.message);
//     }
//   };

//   const handleDelete = async (itemId) => {
//     try {
//       const res = await axios.delete(`/api/user/product/my-cart/${itemId}`);
//       setCartItems(cartItems.filter((item) => item.id !== itemId));
//       toast.success(res.data.message);
//     } catch (err) {
//       toast.error(err.response.data.message);
//     }
//   };

//   const handleAddressChange = (addressId) => {
//     setChoosenAddress(addressId);
//   };

//   const totalAmount = cartItems.reduce(
//     (total, item) => total + item.product.price * item.quantity,
//     0
//   );

//   return (
//     <div className="p-4 bg-gradient-to-r from-slate-50 to-slate-100">
//       <Toaster />
//       <div className="max-w-6xl mx-auto">
//         {/* Cart Items */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//           {cartItems.map((item, index) => (
//             <div
//               key={index}
//               className="bg-white shadow-md rounded-lg overflow-hidden relative border border-gray-300"
//             >
//               <img
//                 src={item.product.product_images[0].image_url}
//                 alt={item.product.name}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <Link
//                   to={"/product/" + item.product.slug}
//                   className="text-lg font-semibold mb-2 text-gray-900 hover:underline hover:text-gray-700"
//                 >
//                   {item.product.name}
//                 </Link>
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-green-700 font-bold">
//                     ₹{item.product.price}
//                   </span>
//                   <span className="text-gray-600">Qty: {item.quantity}</span>
//                 </div>
//                 <div className="flex justify-between items-center mb-4">
//                   <span className="text-gray-800 font-semibold">
//                     Total: ₹{item.product.price * item.quantity}
//                   </span>
//                   <button
//                     onClick={() => handleDelete(item.cart_item_id)}
//                     className="text-red-600 hover:text-red-800 font-semibold"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Delivery Addresses */}
//         <div className="bg-white shadow-md rounded-lg p-4 mb-8 border border-gray-300">
//           <h1 className="text-xl font-semibold mb-4 text-gray-900">
//             Delivery Addresses
//           </h1>
//           {userAddresses.length > 0 ? (
//             <div className="flex flex-col gap-4">
//               {userAddresses.map((address) => (
//                 <div
//                   key={address.user_address_id}
//                   className={`border p-4 rounded-lg ${
//                     chosenAddress === address.user_address_id
//                       ? "border-gray-800 bg-gray-100"
//                       : "border-gray-300"
//                   }`}
//                 >
//                   <input
//                     type="radio"
//                     name="selectAddress"
//                     id={`address-${address.user_address_id}`}
//                     checked={chosenAddress === address.user_address_id}
//                     onChange={() =>
//                       handleAddressChange(address.user_address_id)
//                     }
//                     className="mr-2"
//                   />
//                   <p className="text-gray-800">
//                     {address.street}, {address.village}, {address.taluk},{" "}
//                     {address.district} - {address.pin_code}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     Contact: {address.contact_number}
//                   </p>
//                 </div>
//               ))}
//               <Link to="/manage-addresses">
//                 <button className="mt-4 text-slate-600 hover:text-slate-800 font-semibold underline">
//                   Manage Addresses
//                 </button>
//               </Link>
//             </div>
//           ) : (
//             <p className="text-center text-gray-600">No Addresses Available</p>
//           )}
//         </div>

//         {/* Total Price and Order Button */}
//         <div className="bg-white shadow-md rounded-lg p-4 border border-gray-300">
//           <div className="flex justify-between items-center mb-4">
//             <span className="text-lg font-semibold text-gray-900">
//               Total Price:
//             </span>
//             <span className="text-xl font-bold text-gray-900">
//               ₹{totalAmount}
//             </span>
//           </div>
//           <button
//             onClick={orderNow}
//             className="w-full bg-slate-600 text-white py-2 rounded-lg font-semibold hover:bg-slate-700"
//           >
//             Order Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Cart;
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [userAddresses, setUserAddresses] = useState([]);
  const [chosenAddress, setChoosenAddress] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res1 = await axios.get("/api/user/product/my-cart");
        const res2 = await axios.get("/api/user/address");
        setUserAddresses(res2.data.data);
        setCartItems(res1.data.data.items);
      } catch (err) {
        if (err.response.status === 401) navigate("/login");
        console.error(err.response.data.message);
      }
    })();
  }, [navigate]);

  const orderNow = async () => {
    try {
      const res = await axios.post("/api/user/product/cart/order-now", {
        userAddress: chosenAddress,
      });
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      const res = await axios.delete(`/api/user/product/my-cart/${itemId}`);
      setCartItems(cartItems.filter((item) => item.id !== itemId));
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleAddressChange = (addressId) => {
    setChoosenAddress(addressId);
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />
      <div className="p-4 bg-gradient-to-r from-slate-50 to-slate-100">
        <Toaster />
        <div className="max-w-6xl mx-auto">
          {/* Cart Items */}
          {cartItems.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-md rounded-lg overflow-hidden relative border border-gray-300"
                  >
                    <img
                      src={item.product.product_images[0].image_url}
                      alt={item.product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <Link
                        to={"/product/" + item.product.slug}
                        className="text-lg font-semibold mb-2 text-gray-900 hover:underline hover:text-gray-700"
                      >
                        {item.product.name}
                      </Link>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-green-700 font-bold">
                          ₹{item.product.price}
                        </span>
                        <span className="text-gray-600">
                          Qty: {item.quantity}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-800 font-semibold">
                          Total: ₹{item.product.price * item.quantity}
                        </span>
                        <button
                          onClick={() => handleDelete(item.cart_item_id)}
                          className="text-red-600 hover:text-red-800 font-semibold"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Addresses */}
              <div className="bg-white shadow-md rounded-lg p-4 mb-8 border border-gray-300">
                <h1 className="text-xl font-semibold mb-4 text-gray-900">
                  Delivery Addresses
                </h1>
                {userAddresses.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {userAddresses.map((address) => (
                      <div
                        key={address.user_address_id}
                        className={`border p-4 rounded-lg ${
                          chosenAddress === address.user_address_id
                            ? "border-gray-800 bg-gray-100"
                            : "border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="selectAddress"
                          id={`address-${address.user_address_id}`}
                          checked={chosenAddress === address.user_address_id}
                          onChange={() =>
                            handleAddressChange(address.user_address_id)
                          }
                          className="mr-2"
                        />
                        <p className="text-gray-800">
                          {address.street}, {address.village}, {address.taluk},{" "}
                          {address.district} - {address.pin_code}
                        </p>
                        <p className="text-sm text-gray-600">
                          Contact: {address.contact_number}
                        </p>
                      </div>
                    ))}
                    <Link to="/user/manage-addresses">
                      <button className="mt-4 text-slate-600 hover:text-slate-800 font-semibold underline">
                        Manage Addresses
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div>
                    <p className="text-center text-gray-600">
                      No Addresses Available
                    </p>
                    <Link to="/manage-addresses">
                      <button className="mt-4 text-slate-600 hover:text-slate-800 font-semibold underline">
                        Manage Addresses
                      </button>
                    </Link>
                  </div>
                )}
              </div>

              {/* Total Price and Order Button */}
              <div className="bg-white shadow-md rounded-lg p-4 border border-gray-300">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-900">
                    Total Price:
                  </span>
                  <span className="text-xl font-bold text-gray-900">
                    ₹{totalAmount}
                  </span>
                </div>
                <button
                  onClick={orderNow}
                  className="w-full bg-slate-600 text-white py-2 rounded-lg font-semibold hover:bg-slate-700"
                >
                  Order Now
                </button>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-64 bg-white shadow-md rounded-lg border border-gray-300">
              <p className="text-xl font-bold text-gray-800">
                No Products in Cart
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cart;
