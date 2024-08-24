import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function BuyNow() {
  const { slugId, qty } = useParams();
  let [productDetails, setProductDetails] = useState();
  let [quantity, setQuantity] = useState(parseInt(qty));
  let [userAddresses, setUserAddresses] = useState([]);
  let [chosenAddress, setChoosenAdress] = useState();

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
        console.error(err.response.data.message);
      }
    })();
  }, []);

  const handleBuyNow = async () => {
    try {
      const res = await axios.post("/api/user/product/buy-now", {
        slug: slugId,
        quantity: quantity,
        userAddress: chosenAddress,
      });
      console.log(res);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleAddressChange = (addressId) => {
    setChoosenAdress(addressId);
  };

  if (!productDetails) return <div>No Response</div>;
  return (
    <>
      <div>
        <Toaster />
      </div>
      <div>
        <h1>Buy Now</h1>
        <div className="border bg-orange-200 p-10">
          {productDetails.product_images.length > 0 && (
            <img
              src={productDetails.product_images[0].image_url}
              alt="product image"
            />
          )}
          <Link
            className="hover:text-blue-900 hover:underline"
            to={"/product/" + slugId}
          >
            <h1 className="font-semibold text-2xl">{productDetails.name}</h1>
          </Link>

          <h2 className="font-medium text-xl">{productDetails.sub_name}</h2>
          <p className="text-4xl font-bold">{productDetails.price} Rupees</p>
        </div>
        <div>
          <p className="text-xl">quantity:</p>
          <div className="flex gap-3">
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="border px-2 py-4 bg-orange-600 text-white"
            >
              Add
            </button>
            <p>{quantity}</p>
            <button
              onClick={() =>
                setQuantity((prev) => {
                  return prev > 1 ? prev - 1 : 1;
                })
              }
              className="border px-2 py-4 bg-blue-600 text-white"
            >
              Remove
            </button>
          </div>
        </div>
        <div>
          <button
            onClick={handleBuyNow}
            className="text-2xl bg-green-600 text-white px-8 py-4 rounded-sm m-4"
          >
            Buy
          </button>
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
      </div>
    </>
  );
}

export default BuyNow;
