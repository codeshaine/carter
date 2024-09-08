import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useFetch } from "../../hooks/useFetch";

function BuyNow() {
  const { slugId, qty } = useParams();
  const [quantity, setQuantity] = useState(parseInt(qty));
  const [chosenAddress, setChoosenAddress] = useState(null);
  const navigate = useNavigate();

  const [productDetails, , productError, productLoading] = useFetch(
    `/api/product/${slugId}`,
    [navigate, slugId]
  );
  const [userAddresses, , addressError, addressLoading] = useFetch(
    "/api/user/address",
    [navigate, slugId]
  );

  const handleBuyNow = async () => {
    try {
      await axios.post("/api/user/product/buy-now", {
        slug: slugId,
        quantity,
        userAddress: chosenAddress,
      });
      toast.success("Product Purchased Successfully");
    } catch (err) {
      toast.error(err.response.data.message + " Provide a valid address");
    }
  };

  const handleAddressChange = (addressId) => {
    setChoosenAddress(addressId);
  };

  //loggin fetching error just in case
  console.log(
    "Error:\nproduct error:",
    productError,
    "\n address error:",
    addressError
  );

  if (productLoading || addressLoading)
    return <div className="text-center py-6 text-slate-600">Loading...</div>;

  return (
    <>
      <Navbar />
      <Toaster />
      <div className="my-4 max-w-4xl mx-auto p-6 bg-gray-100">
        <h1 className="text-4xl font-extrabold mb-8 text-slate-900">Buy Now</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          {productDetails.product_images?.length > 0 && (
            <img
              src={productDetails.product_images[0].image_url}
              alt={productDetails.name}
              className="w-full h-80 object-cover rounded-t-lg"
            />
          )}
          <div className="p-6">
            <Link
              className="text-slate-600 hover:text-slate-800 hover:underline"
              to={`/product/${slugId}`}
            >
              <h2 className="text-3xl font-semibold mb-2">
                {productDetails.name}
              </h2>
            </Link>
            <h3 className="text-xl font-medium text-slate-700 mb-4">
              {productDetails.sub_name}
            </h3>
            <p className="text-3xl font-bold text-orange-slate mb-4">
              ₹{productDetails.price}
            </p>
            <p className="text-slate-700 mb-6">{productDetails.description}</p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <p className="text-xl font-medium mb-4">Quantity:</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
              className="bg-slate-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-slate-700"
            >
              -
            </button>

            <p className="text-xl font-medium text-slate-800">{quantity}</p>

            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="bg-orange-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-orange-700"
            >
              +
            </button>
          </div>
          <button
            onClick={handleBuyNow}
            className="mt-6 text-xl bg-green-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-green-700"
          >
            Buy Now
          </button>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 text-slate-900">
            Delivery Addresses
          </h2>
          {userAddresses.length > 0 ? (
            <>
              {userAddresses.map((address) => (
                <div
                  key={address.user_address_id}
                  className={`border p-4 rounded-lg mb-4 ${
                    chosenAddress === address.user_address_id
                      ? "border-slate-500 bg-blue-50"
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
                  <p className="font-medium text-slate-800">
                    {address.street}, {address.village}, {address.taluk},{" "}
                    {address.district} - {address.pin_code}
                  </p>
                  <p className="text-sm text-gray-600">
                    Contact: {address.contact_number}
                  </p>
                </div>
              ))}
              <Link to="/manage-addresses">
                <button className="mt-4 text-slate-600 hover:text-slate-800 underline">
                  Manage Addresses
                </button>
              </Link>
            </>
          ) : (
            <div>
              <p className="text-center text-gray-600">
                No Addresses Available
              </p>
              <Link to="/user/manage-addresses">
                <button className="mt-4 text-slate-600 hover:text-slate-800 font-semibold underline">
                  Manage Addresses
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BuyNow;
