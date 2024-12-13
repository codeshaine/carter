import axios from "axios";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import PaginationControls from "../../components/PaginationController/PaginationController";
import Loader from "../../components/Loader/Loader";
import { useFetch } from "../../hooks/useFetch";
import SubLoader from "../../components/Loader/SubLoader";

function ManageMyProducts() {
  const navigate = useNavigate();
  const limit = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageNumber, setTotalPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);

  const [data, setData, productError, productLoading] = useFetch(
    `/api/seller/products?limit=${limit}&page=${currentPage}`,
    [navigate, currentPage]
  );
  useEffect(() => {
    if (data?.totalNumberOfProduct) {
      setTotalPageNumber(Math.ceil(data.totalNumberOfProduct / limit));
    }
  }, [data?.totalNumberOfProduct]);

  async function handleDeleteProduct(slugId) {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        setLoading(true);
        const res = await axios.delete(`/api/seller/product/delete/${slugId}`);
        toast.success(res.data.message);
        setData((prevData) => ({
          ...prevData,
          productData: prevData.productData.filter(
            (product) => product.slug !== slugId
          ),
        }));
      } catch (err) {
        console.log(err);
        toast.error("Failed to delete product");
      } finally {
        setLoading(false);
      }
    }
  }

  async function handleVisitProduct(slugId) {
    navigate(`/product/${slugId}`);
  }

  if (productError) console.log("Error:\n Product Eror:\n", productError);
  if (productLoading) return <Loader />;

  return (
    <>
      {loading && (
        <div className="fixed z-50">
          <SubLoader />
        </div>
      )}
      <Navbar />
      <div className="min-h-screen  flex flex-col items-center p-4">
        <Toaster />
        <h1 className="text-3xl font-bold mb-6 text-gray-800">My Products</h1>
        <div className="w-full max-w-4xl space-y-4">
          {data.productData?.length > 0 ? (
            data.productData.map((product) => (
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
                <div className="flex gap-2">
                  <button
                    disabled={loading}
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
