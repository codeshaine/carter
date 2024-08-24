import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function Product() {
  const { slugId } = useParams();
  const navigate = useNavigate();

  let [quantity, setQuantity] = useState(1);
  const [productDetails, setProductDetails] = useState();
  if (!slugId) {
    navigate("/");
  }
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/api/product/" + slugId);
        setProductDetails(res.data.data);
        // console.log(res.data.data.product_images[0].image_url);
      } catch (err) {
        console.error(err.response.data.message);
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const rawData = new FormData(e.target);
    const formData = Object.fromEntries(rawData);
    formData.star = parseInt(formData.star);
    try {
      await axios.post("/api/user/product/review/" + slugId, formData);
      toast.success("Review added successfully");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleBuyNow = async (value) => {
    navigate("/user/buy-now/" + value + "/" + quantity);
  };
  const handleAddToCart = async (slug) => {
    const cartBody = { slug, quantity: quantity };
    try {
      const res = await axios.post("/api/user/product/add-to-cart", cartBody);
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  if (!productDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="lg:screen lg:h-screen lg:px-14 bg-blue-300">
      <div>
        <Toaster />
      </div>
      <div className="lg:w-full lg:h-full bg-red-200 flex">
        <div className="border border-black lg:w-2/3">
          <div className="p-4">
            <img
              className="w-1/4"
              src={productDetails.product_images[0].image_url}
              alt="product image"
            />
          </div>
          <div className="flex gap-2 lg:w-full bg-blue-500">
            <button
              onClick={() => handleBuyNow(productDetails.slug)}
              className="border px-4 py-2 bg-orange-500 text-white"
            >
              buy now
            </button>
            <button
              onClick={() => handleAddToCart(productDetails.slug)}
              className="border px-4 py-2 bg-orange-500 text-white"
            >
              Add To Cart
            </button>
          </div>
          <div className="bg-blue-200">
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
        </div>
        <div className="bg-red-500 lg:w-full">
          <h1 className="lg:text-2xl font-bold">{productDetails.name}</h1>
          <h2 className="lg:text-sm">{productDetails.sub_name}</h2>
          <div>
            <p>star</p>
          </div>
          <div>
            <h1 className="lg:text-4xl font-bold">{productDetails.price}</h1>
          </div>
          <div>
            <h1 className="lg:font-semibold">description:</h1>
            <p>{productDetails.description}</p>
          </div>
          <div>
            <h1 className="lg:font-semibold">seller:</h1>
            <div className="border">
              <img
                className="lg:w-10"
                src={productDetails.seller.seller_logo_url}
                alt="seller_profile"
              />
              <h1>{productDetails.seller.seller_name}</h1>
              <p>{productDetails.seller.seller_email}</p>
              <p>{productDetails.seller.seller_address}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-green-500">
        {/************************review section***********************************/}
        <h1 className="font-bold">Reviews</h1>
        <div>
          {productDetails.review.map((review) => {
            return (
              <div key={review.review_id}>
                <img
                  className="w-20 rounded-full"
                  src={review.user.profile_url}
                  alt="user-profile"
                />
                <h1>{review.user.name}</h1>
                <h1>{review.user.email}</h1>
                <p>{review.star}</p>
                <p>{review.review}</p>
              </div>
            );
          })}
        </div>
        <div>
          <h1>Write a Review</h1>
          <form onSubmit={handleSubmit} className="m-10 p-2 bg-green-200">
            <input
              type="number"
              name="star"
              className="lg:p-2 border"
              placeholder="star"
            />
            <input
              type="text"
              name="review"
              placeholder="review"
              className="lg:p-2 border"
            />
            <button className="lg:px-4  py-2 bg-blue-400">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Product;
