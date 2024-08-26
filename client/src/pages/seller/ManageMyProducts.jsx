// import axios from "axios";
// import { useEffect, useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// function ManageMyProducts() {
//   let [productData, setProductData] = useState([]);
//   const navigate = useNavigate();
//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await axios.get("/api/seller/products");
//         setProductData(res.data.data);
//       } catch (err) {
//         console.log(err);
//       }
//     })();
//   }, []);
//   async function handleDeleteProduct(slugId) {
//     try {
//       const res = await axios.delete("/api/seller/product/delete/" + slugId);
//       console.log(res.data.message);
//       toast.success(res.data.message);
//     } catch (err) {
//       console.log(err);
//     }
//   }
//   async function handleVisitProduct(slugId) {
//     navigate("/product/" + slugId);
//     console.log(slugId);
//   }
//   return (
//     <>
//       <div>
//         <div>
//           <Toaster />
//         </div>
//         <div>
//           <h1>My Products</h1>
//           {productData.length > 0 &&
//             productData.map((product) => {
//               return (
//                 <div
//                   className="m-2 border bg-yellow-200 lg:p-2"
//                   key={product.slug}
//                 >
//                   <h1 className="lg:text-xl font-semibold">{product.name}</h1>

//                   <h2 className="lg:text-md font-semibold">
//                     {product.sub_name}
//                   </h2>
//                   {product.product_images.length > 0 && (
//                     <img
//                       className="lg:w-40"
//                       src={product.product_images[0]?.image_url}
//                       alt="product"
//                     />
//                   )}
//                   <p>Price:{product.price}</p>
//                   <p>{product.stock}</p>
//                   <div className="flex lg:gap-4">
//                     <button
//                       className="bg-red-600 text-white lg:py-2 lg:px-4 "
//                       onClick={() => handleDeleteProduct(product.slug)}
//                     >
//                       Delete
//                     </button>
//                     <button
//                       className="bg-blue-600 text-white lg:py-2 lg:px-4 "
//                       onClick={() => handleVisitProduct(product.slug)}
//                     >
//                       visit
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//         </div>
//       </div>
//     </>
//   );
// }

// export default ManageMyProducts;

import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ManageMyProducts() {
  const [productData, setProductData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/api/seller/products");
        setProductData(res.data.data);
      } catch (err) {
        if (err.response.status === 401) navigate("/seller/signup");
        console.log(err);
        toast.error("Failed to fetch products");
      }
    })();
  }, []);

  async function handleDeleteProduct(slugId) {
    try {
      const res = await axios.delete(`/api/seller/product/delete/${slugId}`);
      toast.success(res.data.message);
      setProductData((prevData) =>
        prevData.filter((product) => product.slug !== slugId)
      );
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete product");
    }
  }

  async function handleVisitProduct(slugId) {
    navigate(`/product/${slugId}`);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <Toaster />
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Products</h1>
      <div className="w-full max-w-4xl space-y-4">
        {productData.length > 0 ? (
          productData.map((product) => (
            <div
              className="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4"
              key={product.slug}
            >
              <div className="flex-shrink-0">
                {product.product_images.length > 0 && (
                  <img
                    className="w-32 h-32 object-cover rounded-md"
                    src={product.product_images[0]?.image_url}
                    alt={product.name}
                  />
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-700">
                  {product.name}
                </h2>
                <h3 className="text-md font-medium text-gray-600">
                  {product.sub_name}
                </h3>
                <p className="text-lg font-bold text-gray-800 mt-2">
                  Price: ${product.price}
                </p>
                <p className="text-sm text-gray-600">Stock: {product.stock}</p>
              </div>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                <button
                  className="bg-red-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
                  onClick={() => handleDeleteProduct(product.slug)}
                >
                  Delete
                </button>
                <button
                  className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                  onClick={() => handleVisitProduct(product.slug)}
                >
                  Visit
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No products found.</p>
        )}
      </div>
    </div>
  );
}

export default ManageMyProducts;
