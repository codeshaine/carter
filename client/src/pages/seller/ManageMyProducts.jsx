import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import PaginationControls from "../../components/PaginationController/PaginationController";

function ManageMyProducts() {
  const [productData, setProductData] = useState([]);
  const navigate = useNavigate();
  const limit = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageNumber, setTotalPageNumber] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `/api/seller/products?limit=${limit}&page=${currentPage}`
        );
        setProductData(res.data.data.productData);
        setTotalPageNumber(
          Math.ceil(res.data.data.totalNumberOfProduct / limit)
        );
      } catch (err) {
        if (err.response.status === 401) navigate("/seller/signup");
        console.log(err);
        toast.error("Failed to fetch products");
      }
    })();
  }, [navigate, currentPage]);

  async function handleDeleteProduct(slugId) {
    if (window.confirm("Are you sure you want to delete this product?")) {
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
  }

  async function handleVisitProduct(slugId) {
    navigate(`/product/${slugId}`);
  }

  return (
    <>
      <Navbar />
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
                  <h2 className="text-xl font-semibold text-gray-800">
                    {product.name}
                  </h2>
                  <h3 className="text-md font-medium text-gray-600">
                    {product.sub_name}
                  </h3>
                  <p className="text-lg font-bold text-slate-800 mt-2">
                    Price: ₹{product.price}
                  </p>
                  <p className="text-sm text-gray-600">
                    Stock: {product.stock}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                  <button
                    className="bg-slate-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-slate-700 focus:outline-none focus:ring focus:ring-slate-300"
                    onClick={() => handleDeleteProduct(product.slug)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-gray-800 text-white py-2 px-4 rounded-md shadow-sm hover:bg-gray-900 focus:outline-none focus:ring focus:ring-gray-500"
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
        <PaginationControls
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={totalPageNumber}
        />
      </div>
      <Footer />
    </>
  );
}

export default ManageMyProducts;
