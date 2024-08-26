// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";

// function Product() {
//   const { slugId } = useParams();
//   const navigate = useNavigate();

//   let [quantity, setQuantity] = useState(1);
//   const [productDetails, setProductDetails] = useState();
//   if (!slugId) {
//     navigate("/");
//   }
//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await axios.get("/api/product/" + slugId);
//         setProductDetails(res.data.data);
//         // console.log(res.data.data.product_images[0].image_url);
//       } catch (err) {
//         console.error(err.response.data.message);
//       }
//     })();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const rawData = new FormData(e.target);
//     const formData = Object.fromEntries(rawData);
//     formData.star = parseInt(formData.star);
//     try {
//       await axios.post("/api/user/product/review/" + slugId, formData);
//       toast.success("Review added successfully");
//     } catch (err) {
//       toast.error(err.response.data.message);
//     }
//   };

//   const handleBuyNow = async (value) => {
//     navigate("/user/buy-now/" + value + "/" + quantity);
//   };
//   const handleAddToCart = async (slug) => {
//     const cartBody = { slug, quantity: quantity };
//     try {
//       const res = await axios.post("/api/user/product/add-to-cart", cartBody);
//       toast.success(res.data.message);
//     } catch (err) {
//       toast.error(err.response.data.message);
//     }
//   };

//   if (!productDetails) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="lg:screen lg:h-screen lg:px-14 bg-blue-300">
//       <div>
//         <Toaster />
//       </div>
//       <div className="lg:w-full lg:h-full bg-red-200 flex">
//         <div className="border border-black lg:w-2/3">
//           <div className="p-4">
//             <img
//               className="w-1/4"
//               src={productDetails.product_images[0].image_url}
//               alt="product image"
//             />
//           </div>
//           <div className="flex gap-2 lg:w-full bg-blue-500">
//             <button
//               onClick={() => handleBuyNow(productDetails.slug)}
//               className="border px-4 py-2 bg-orange-500 text-white"
//             >
//               buy now
//             </button>
//             <button
//               onClick={() => handleAddToCart(productDetails.slug)}
//               className="border px-4 py-2 bg-orange-500 text-white"
//             >
//               Add To Cart
//             </button>
//           </div>
//           <div className="bg-blue-200">
//             <p className="text-xl">quantity:</p>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setQuantity((prev) => prev + 1)}
//                 className="border px-2 py-4 bg-orange-600 text-white"
//               >
//                 Add
//               </button>
//               <p>{quantity}</p>
//               <button
//                 onClick={() =>
//                   setQuantity((prev) => {
//                     return prev > 1 ? prev - 1 : 1;
//                   })
//                 }
//                 className="border px-2 py-4 bg-blue-600 text-white"
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className="bg-red-500 lg:w-full">
//           <h1 className="lg:text-2xl font-bold">{productDetails.name}</h1>
//           <h2 className="lg:text-sm">{productDetails.sub_name}</h2>
//           <div>
//             <p>star</p>
//           </div>
//           <div>
//             <h1 className="lg:text-4xl font-bold">{productDetails.price}</h1>
//           </div>
//           <div>
//             <h1 className="lg:font-semibold">description:</h1>
//             <p>{productDetails.description}</p>
//           </div>
//           <div>
//             <h1 className="lg:font-semibold">seller:</h1>
//             <div className="border">
//               <img
//                 className="lg:w-10"
//                 src={productDetails.seller.seller_logo_url}
//                 alt="seller_profile"
//               />
//               <h1>{productDetails.seller.seller_name}</h1>
//               <p>{productDetails.seller.seller_email}</p>
//               <p>{productDetails.seller.seller_address}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="bg-green-500">
//         {/************************review section***********************************/}
//         <h1 className="font-bold">Reviews</h1>
//         <div>
//           {productDetails.review.map((review) => {
//             return (
//               <div key={review.review_id}>
//                 <img
//                   className="w-20 rounded-full"
//                   src={review.user.profile_url}
//                   alt="user-profile"
//                 />
//                 <h1>{review.user.name}</h1>
//                 <h1>{review.user.email}</h1>
//                 <p>{review.star}</p>
//                 <p>{review.review}</p>
//               </div>
//             );
//           })}
//         </div>
//         <div>
//           <h1>Write a Review</h1>
//           <form onSubmit={handleSubmit} className="m-10 p-2 bg-green-200">
//             <input
//               type="number"
//               name="star"
//               className="lg:p-2 border"
//               placeholder="star"
//             />
//             <input
//               type="text"
//               name="review"
//               placeholder="review"
//               className="lg:p-2 border"
//             />
//             <button className="lg:px-4  py-2 bg-blue-400">Submit</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Product;
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function Product() {
  const { slugId } = useParams();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    if (!slugId) {
      navigate("/");
      return;
    }

    (async () => {
      try {
        const res = await axios.get(`/api/product/${slugId}`);
        setProductDetails(res.data.data);
      } catch (err) {
        console.error(err.response.data.message);
      }
    })();
  }, [slugId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    data.star = parseInt(data.star);

    try {
      await axios.post(`/api/user/product/review/${slugId}`, data);
      toast.success("Review added successfully");
    } catch (err) {
      toast.error(err.response.data.message);
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

  if (!productDetails) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-100">
      <Toaster />
      <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="lg:w-1/2 p-4">
          <img
            src={
              productDetails.product_images.length > 0
                ? productDetails.product_images[0].image_url
                : ""
            }
            alt={productDetails.name}
            className="w-full h-80 object-cover rounded-lg"
          />
        </div>
        <div className="lg:w-1/2 p-4">
          <h1 className="text-3xl font-bold mb-2">{productDetails.name}</h1>
          <h2 className="text-lg text-gray-600 mb-4">
            {productDetails.sub_name}
          </h2>
          <p className="text-xl font-semibold text-gray-800 mb-2">
            ${productDetails.price}
          </p>
          <p className="text-gray-700 mb-4">{productDetails.description}</p>
          <p className="text-gray-600 mb-4">
            Category:{" "}
            <span className="font-medium">{productDetails.category}</span>
          </p>
          <p className="text-gray-600 mb-4">
            Seller:{" "}
            <span className="font-medium">
              {productDetails.seller.seller_name}
            </span>
          </p>
          <div className="flex gap-4 mb-4">
            <button
              onClick={handleBuyNow}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600 transition"
            >
              Buy Now
            </button>
            <button
              onClick={handleAddToCart}
              className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
            >
              Add to Cart
            </button>
          </div>
          <div className="flex items-center mb-4">
            <button
              onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
              className="bg-blue-500 text-white px-4 py-2 rounded-l-lg shadow hover:bg-blue-600 transition"
            >
              -
            </button>
            <input
              type="text"
              value={quantity}
              readOnly
              className="border-t border-b border-gray-300 text-center px-4 py-2 w-24"
            />
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="bg-blue-500 text-white px-4 py-2 rounded-r-lg shadow hover:bg-blue-600 transition"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {productDetails.review.length > 0 ? (
          productDetails.review.map((review) => (
            <div
              key={review.review_id}
              className="border-b border-gray-300 p-4 flex items-start"
            >
              <img
                src={review.user.profile_url}
                alt={review.user.name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h3 className="text-xl font-semibold">{review.user.name}</h3>
                <p className="text-gray-600">{review.user.email}</p>
                <p className="text-yellow-500">{"★".repeat(review.star)}</p>
                <p className="text-gray-700">{review.review}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No reviews yet</p>
        )}
      </section>
      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded-lg shadow-md"
        >
          <input
            type="number"
            name="star"
            className="border border-gray-300 p-2 w-full mb-4 rounded-lg"
            placeholder="Rating (1-5)"
            min="1"
            max="5"
            required
          />
          <textarea
            name="review"
            className="border border-gray-300 p-2 w-full mb-4 rounded-lg"
            placeholder="Write your review"
            rows="4"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
          >
            Submit Review
          </button>
        </form>
      </section>
    </div>
  );
}

export default Product;
