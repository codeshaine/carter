import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import PaginationControls from "../components/PaginationController/PaginationController";
import Footer from "../components/Footer/Footer";
import { FaFilter, FaRupeeSign } from "react-icons/fa";
import Loader from "../components/Loader/Loader";
import axios from "axios";

function ProductList() {
  const { nameParam } = useParams();
  const [searchParams] = useSearchParams();
  const catQuery = searchParams.get("cat") || "";
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageNumber, setTotalPageNumber] = useState(1);
  const limit = 8;
  const [products, setProducts] = useState([]);
  const [productLoading, setProductLoading] = useState(false);

  //filter
  const [selectedCategory, setSelectedCategory] = useState(catQuery);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  //fetching data
  const [fetchData, setFetchData] = useState(false);

  const params = useMemo(() => {
    return new URLSearchParams({
      page: currentPage,
      limit,
      cat: selectedCategory,
      lb: priceRange.min,
      ub: priceRange.max,
    });
  }, [currentPage, selectedCategory, priceRange]);

  //function to fetch data
  const getData = useCallback(async () => {
    setProductLoading(true);
    try {
      const res = await axios.get(`/api/product/f/${nameParam}?${params}`);
      setProducts(res.data.data);
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setProductLoading(false);
    }
  }, [params, nameParam]);

  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, [fetchData]);

  //for page change
  useEffect(() => {
    setFetchData((prev) => !prev);
  }, [currentPage, nameParam, searchParams]);

  //setting page limit
  useEffect(() => {
    setTotalPageNumber(Math.ceil(products.tp / limit) || 1);
  }, [products]);

  //fetching data when applying and clearing filter
  async function handleApplyFilter() {
    setFetchData((prev) => !prev);
  }

  async function handleClearFilter() {
    setSelectedCategory("");
    setPriceRange({ min: "", max: "" });
    setCurrentPage(1);
    setFetchData((prev) => !prev);
  }

  const handlePageChange = useCallback((value) => {
    setCurrentPage(value);
  }, []);

  return (
    <>
      <Navbar />

      {/* Filter Section */}
      <div className="container mx-auto lg:px-6 lg:py-4 px-3 py-2  flex lg:text-lg text-sm  flex-wrap justify-between items-center space-y-4 md:space-y-0">
        <div className="flex lg:space-x-4 space-x-2">
          {/* Category Filter */}
          <div className="relative lg:w-48 w-24">
            <label className=" text-gray-800 font-semibold mb-2 flex items-center">
              <FaFilter className="lg:mr-2 mr-1" /> Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className=" w-full border border-slate-300  rounded-full p-2 pl-4 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothes">Clothing</option>
              <option value="Books">Books</option>
              <option value="Furniture">Furniture</option>
              <option value="Toys">Toys</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="relative w-32">
            <label className=" text-gray-800 font-semibold mb-2 flex items-center">
              <FaRupeeSign className="mr-2" /> Min
            </label>
            <input
              type="number"
              value={priceRange.min}
              onChange={(e) =>
                setPriceRange((prev) => {
                  return {
                    ...prev,
                    min: e.target.value,
                  };
                })
              }
              className="w-full border border-slate-300 rounded-full p-2 pl-4 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              placeholder="₹"
            />
          </div>

          <div className="relative w-32">
            <label className=" text-gray-800 font-semibold mb-2 flex items-center">
              <FaRupeeSign className="mr-2" /> Max
            </label>
            <input
              type="number"
              value={priceRange.max}
              onChange={(e) =>
                setPriceRange((prev) => {
                  return {
                    ...prev,
                    max: e.target.value,
                  };
                })
              }
              className="w-full border border-slate-300 rounded-full p-2 pl-4 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              placeholder="₹"
            />
          </div>
        </div>
        <div className="flex lg:gap-4 gap-2">
          {/* Apply Filters Button */}
          <button
            onClick={handleApplyFilter}
            className="text-white bg-slate-700 hover:bg-slate-800 px-4 py-2 rounded-full"
          >
            Apply Filters
          </button>
          {/* Clear Filters Button */}
          <button
            onClick={handleClearFilter}
            className="text-white bg-slate-700 hover:bg-slate-800 px-4 py-2 rounded-full"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {productLoading ? (
        <Loader />
      ) : (
        <div className="container mx-auto p-6 bg-gradient-to-r  my-4">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Search Results for &quot;
              <span className="text-gray-600">
                {searchParams.get("cat")
                  ? searchParams.get("cat")
                  : "" + "" + nameParam}
              </span>
              &quot;
            </h1>
          </div>
          {products?.pl?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.pl.map((product) => (
                <div
                  key={product.product_id}
                  className="bg-white border border-gray-300 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg hover:border-gray-400"
                >
                  <img
                    src={
                      product.product_images.length > 0
                        ? product.product_images[0].image_url
                        : "/path-to-default-image.jpg" // Placeholder image
                    }
                    alt={product.name}
                    className="w-full h-56 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      <Link
                        to={`/product/${product.slug}`}
                        className="text-gray-700 hover:text-gray-900 transition-colors"
                      >
                        {product.name}
                      </Link>
                    </h2>
                    <p className="text-gray-600 mb-2 text-sm">
                      {product.sub_name}
                    </p>
                    <p className="text-gray-900 font-semibold mb-2">
                      Price:{" "}
                      <span className="text-gray-800">₹{product.price}</span>
                    </p>
                    <p className="text-gray-800 mb-2 text-sm">
                      Category:{" "}
                      <span className="text-gray-700">{product.category}</span>
                    </p>
                    <div className="flex items-center">
                      {product.review.length > 0 ? (
                        <>
                          <p className="text-yellow-500 mr-2 text-sm">
                            {(
                              product.review.reduce(
                                (acc, review) => acc + review.star,
                                0
                              ) / product.review.length
                            ).toFixed(1)}
                          </p>
                          <span className="text-yellow-500 text-sm">
                            &#9733;&#9733;&#9733;&#9733;&#9733;
                          </span>
                        </>
                      ) : (
                        <p className="text-gray-600 text-sm">No reviews yet</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-64 bg-gray-100 border border-gray-300 rounded-lg shadow-md">
              <p className="text-gray-600 text-lg font-semibold">
                No products found.
              </p>
            </div>
          )}
          {/* {products.length > 0 && ( */}
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPageNumber}
            onPageChange={handlePageChange}
            className="mt-8"
          />
          {/* )} */}
        </div>
      )}

      <Footer />
    </>
  );
}

export default ProductList;
