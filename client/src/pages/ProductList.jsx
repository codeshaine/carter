import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PaginationControls from "../components/PaginationController/PaginationController";

function ProductList() {
  const { nameParam } = useParams();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageNumber, setTotalPageNumber] = useState(1);
  const limit = 6;
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `/api/product/f/${nameParam}?page=${currentPage}&limit=${limit}`
        );
        setProducts(res.data.data.pl);
        setTotalPageNumber(Math.ceil(res.data.data.tp / limit));
      } catch (err) {
        console.error(err.response.data.message);
      }
    })();
  }, [nameParam, currentPage]);

  const handlePageChange = (value) => {
    setCurrentPage(value);
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.product_id}
            className="border rounded-lg p-4 shadow-lg bg-white"
          >
            <img
              src={
                product.product_images.length > 0
                  ? product.product_images[0].image_url
                  : ""
              }
              alt={product.name}
              className="w-full h-48 object-cover rounded-t-lg mb-4"
            />
            <div className="p-2">
              <h2 className="text-xl font-semibold mb-2">
                <Link
                  to={`/product/${product.slug}`}
                  className="text-blue-600 hover:underline"
                >
                  {product.name}
                </Link>
              </h2>
              <p className="text-gray-600 mb-2">{product.sub_name}</p>
              <p className="text-gray-800 font-medium mb-2">
                Price: <span className="text-blue-600">${product.price}</span>
              </p>
              <p className="text-gray-800 mb-2">
                Category:{" "}
                <span className="text-blue-600">{product.category}</span>
              </p>
              <div className="flex items-center">
                {product.review.length > 0 ? (
                  <>
                    <p className="text-yellow-500 mr-2">
                      {product.review.reduce(
                        (acc, review) => acc + review.star,
                        0
                      ) / product.review.length}
                    </p>
                    <span className="text-yellow-500">
                      &#9733;&#9733;&#9733;&#9733;&#9733;
                    </span>
                  </>
                ) : (
                  <p className="text-gray-500">No reviews yet</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPageNumber}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default ProductList;
