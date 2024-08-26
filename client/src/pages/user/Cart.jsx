import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  let [userAddresses, setUserAddresses] = useState([]);
  let [chosenAddress, setChoosenAdress] = useState();
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
  }, []);

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
      console.log(res);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleAddressChange = (addressId) => {
    setChoosenAdress(addressId);
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <div className="p-4">
      <div>
        <Toaster />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cartItems.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden relative"
          >
            <img
              src={item.product.product_images[0].image_url}
              alt={item.product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{item.product.name}</h2>
              <p className="text-gray-600">{item.product.description}</p>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-green-600 font-bold">
                  ${item.product.price}
                </span>
                <span className="text-gray-700">Qty: {item.quantity}</span>
              </div>
              <div className="mt-2">
                <span className="text-gray-800 font-semibold">
                  Total Amount: ${item.product.price * item.quantity}
                </span>
              </div>
              <button
                onClick={() => handleDelete(item.cart_item_id)}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border bg-slate-100 p-2">
        <h1>Delivery Addresses</h1>
        {userAddresses.length > 0 ? (
          <>
            <div className="flex gap-8">
              {userAddresses.map((address) => (
                <div className="border p-4 " key={address.user_address_id}>
                  <input
                    type="radio"
                    name="selectAddress"
                    id={`address-${address.user_address_id}`}
                    checked={chosenAddress === address.user_address_id}
                    onChange={() =>
                      handleAddressChange(address.user_address_id)
                    }
                  />
                  <p>{address.street}</p>
                  <p>{address.village}</p>
                  <p>{address.taluk}</p>
                  <p>{address.district}</p>
                  <p>{address.pin_code}</p>
                  <p>{address.contact_number}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>No Addresses</>
        )}
      </div>

      <div className="mt-8 p-4 bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Total Price:</span>
          <span className="text-xl font-bold">${totalAmount}</span>
        </div>
        <button
          onClick={orderNow}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold"
        >
          Order Now
        </button>
      </div>
    </div>
  );
}

export default Cart;
