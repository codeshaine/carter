import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams, Link, useNavigate } from "react-router-dom";

function BuyNow() {
  const { slugId, qty } = useParams();
  let [productDetails, setProductDetails] = useState();
  let [quantity, setQuantity] = useState(parseInt(qty));
  let [userAddresses, setUserAddresses] = useState([]);
  let [chosenAddress, setChoosenAdress] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res1 = await axios.get("/api/product/" + slugId);
        const res2 = await axios.get("/api/user/address");
        setUserAddresses(res2.data.data);
        setProductDetails(res1.data.data);
        console.log(userAddresses);
        console.log(productDetails);
      } catch (err) {
        if (err.response.status === 401) navigate("/login");
        console.error(err.response.data.message);
      }
    })();
  }, [slugId]);

  const handleBuyNow = async () => {
    try {
      await axios.post("/api/user/product/buy-now", {
        slug: slugId,
        quantity: quantity,
        userAddress: chosenAddress,
      });
      toast.success("Product Purchased Successfully");
    } catch (err) {
      toast.error(
        err.response.data.message + " provide the valid user address"
      );
    }
  };

  const handleAddressChange = (addressId) => {
    setChoosenAdress(addressId);
  };

  if (!productDetails) return <div className="text-center p-4">Loading...</div>;

  return (
    <>
      <Toaster />
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-6">Buy Now</h1>
        <div className="border rounded-lg shadow-lg bg-white p-6 mb-6">
          {productDetails.product_images.length > 0 && (
            <img
              src={productDetails.product_images[0].image_url}
              alt="product"
              className="w-full h-auto object-cover rounded-md mb-4"
            />
          )}
          <Link
            className="text-blue-600 hover:text-blue-800 hover:underline"
            to={`/product/${slugId}`}
          >
            <h2 className="text-2xl font-semibold mb-2">
              {productDetails.name}
            </h2>
          </Link>
          <h3 className="text-xl font-medium mb-2">
            {productDetails.sub_name}
          </h3>
          <p className="text-3xl font-bold text-orange-600">
            {productDetails.price} Rupees
          </p>
        </div>
        <div className="mb-6">
          <p className="text-xl font-medium mb-2">Quantity:</p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="border px-4 py-2 bg-orange-600 text-white rounded-md shadow-sm hover:bg-orange-700"
            >
              Add
            </button>
            <p className="text-xl font-medium">{quantity}</p>
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
              className="border px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
            >
              Remove
            </button>
          </div>
        </div>
        <button
          onClick={handleBuyNow}
          className="text-2xl bg-green-600 text-white px-8 py-4 rounded-lg shadow-md hover:bg-green-700"
        >
          Buy Now
        </button>
        <div className="border rounded-lg bg-gray-50 p-4 mt-6">
          <h2 className="text-2xl font-semibold mb-4">Delivery Addresses</h2>
          {userAddresses.length > 0 ? (
            <div className="space-y-4">
              {userAddresses.map((address) => (
                <div
                  className={`border p-4 rounded-lg ${
                    chosenAddress === address.user_address_id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  }`}
                  key={address.user_address_id}
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
                  <p className="font-medium">
                    {address.street}, {address.village}, {address.taluk},{" "}
                    {address.district} - {address.pin_code}
                  </p>
                  <p className="text-sm text-gray-600">
                    Contact: {address.contact_number}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No Addresses Available</p>
          )}
        </div>
      </div>
    </>
  );
}

export default BuyNow;
