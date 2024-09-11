import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useFetch } from "../hooks/useFetch";
import Loader from "../components/Loader/Loader";

function Product() {
  const { slugId } = useParams();
  const navigate = useNavigate();
  const [reviewLoading, setReviewLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const [productDetails, setProductDetails, productError, productLoading] =
    useFetch(`/api/product/${slugId}`, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setReviewLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    data.star = parseInt(data.star);

    try {
      await axios.post(`/api/user/product/review/${slugId}`, data);
      toast.success("Review added successfully");
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setReviewLoading(false);
    }
  };

  const handleBuyNow = () => {
    navigate(`/user/buy-now/${productDetails.slug}/${quantity}`);
  };

  const handleAddToCart = async () => {
    try {
      await axios.post("/api/user/product/add-to-cart", {
        slug: productDetails.slug,
        quantity,
      });
      toast.success("Product added to cart");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    setReviewLoading(false);
    try {
      await axios.delete(`/api/user/product/review/${reviewId}`);
      setProductDetails((prev) => ({
        ...prev,
        review: prev.review.filter((review) => review.review_id !== reviewId),
      }));
      toast.success("Review deleted successfully");
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setReviewLoading(false);
    }
  };

  if (productError)
    if (productError) console.log("Error:product error:", productError);

  if (productLoading || reviewLoading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <div className="my-4 container mx-auto p-6 bg-gradient-to-r from-gray-100 to-gray-300">
        <Toaster />
        <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="lg:w-1/2 p-6">
            <img
              src={
                productDetails.product_images?.length > 0
                  ? productDetails.product_images[0].image_url
                  : ""
              }
              alt={productDetails.name}
              className="w-full h-80 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="lg:w-1/2 p-6">
            <h1 className="text-3xl font-bold mb-2 text-slate-900">
              {productDetails.name}
            </h1>
            <h2 className="text-lg text-slate-600 mb-4">
              {productDetails.sub_name}
            </h2>
            <p className="text-2xl font-semibold text-slate-900 mb-2">
              ₹{productDetails.price}
            </p>
            <p className="text-slate-800 mb-4">{productDetails.description}</p>
            <p className="text-slate-700 mb-2">
              Category:{" "}
              <span className="font-medium text-slate-900">
                {productDetails.category}
              </span>
            </p>
            <p className="text-slate-700 mb-4">
              Seller:{" "}
              <span className="font-medium text-slate-900">
                {productDetails.seller?.seller_name}
              </span>
            </p>
            <div className="flex gap-4 mb-4">
              <button
                onClick={handleBuyNow}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg shadow hover:from-orange-600 hover:to-orange-700 transition"
              >
                Buy Now
              </button>
              <button
                onClick={handleAddToCart}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg shadow hover:from-green-600 hover:to-green-700 transition"
              >
                Add to Cart
              </button>
            </div>
            <div className="flex items-center mb-4">
              <button
                onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
                className="bg-slate-900 text-white px-4 py-2 rounded-l-lg shadow hover:bg-slate-800 transition"
              >
                -
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="border-t border-b border-slate-300 text-center px-4 py-2 w-24 text-slate-900"
              />
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="bg-slate-900 text-white px-4 py-2 rounded-r-lg shadow hover:bg-slate-800 transition"
              >
                +
              </button>
            </div>
          </div>
        </div>
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Reviews</h2>
          {productDetails.review?.length > 0 ? (
            productDetails.review.map((review) => (
              <div
                key={review.review_id}
                className="border-b border-slate-300 p-4 flex items-start"
              >
                <img
                  src={review.user.profile_url}
                  alt={review.user.name}
                  className="w-16 h-16 rounded-full mr-4 shadow-lg"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900">
                    {review.user.name}
                  </h3>
                  <p className="text-slate-700">{review.user.email}</p>
                  <p className="text-yellow-500">{"★".repeat(review.star)}</p>
                  <p className="text-slate-800">{review.review}</p>
                  <button
                    onClick={() => handleDeleteReview(productDetails.slug)}
                    className="text-red-600 mt-2 hover:text-red-800 transition"
                  >
                    Delete Review
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-slate-600">No reviews yet</p>
          )}
        </section>
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">
            Write a Review
          </h2>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <input
              type="number"
              name="star"
              className="border border-slate-300 p-3 w-full mb-4 rounded-lg text-slate-900"
              placeholder="Rating (1-5)"
              min="1"
              max="5"
              required
            />
            <textarea
              name="review"
              className="border border-slate-300 p-3 w-full mb-4 rounded-lg text-slate-900"
              placeholder="Write your review"
              rows="4"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-4 py-2 rounded-lg shadow hover:from-slate-900 hover:to-slate-800 transition"
            >
              Submit Review
            </button>
          </form>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Product;
