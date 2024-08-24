import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ManageMyProducts() {
  let [productData, setProductData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/api/seller/products");
        setProductData(res.data.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  async function handleDeleteProduct(slugId) {
    try {
      const res = await axios.delete("/api/seller/product/delete/" + slugId);
      console.log(res.data.message);
      toast.success(res.data.message);
    } catch (err) {
      console.log(err);
    }
  }
  async function handleVisitProduct(slugId) {
    navigate("/product/" + slugId);
    console.log(slugId);
  }
  return (
    <>
      <div>
        <div>
          <Toaster />
        </div>
        <div>
          <h1>My Products</h1>
          {productData.length > 0 &&
            productData.map((product) => {
              return (
                <div
                  className="m-2 border bg-yellow-200 lg:p-2"
                  key={product.slug}
                >
                  <h1 className="lg:text-xl font-semibold">{product.name}</h1>

                  <h2 className="lg:text-md font-semibold">
                    {product.sub_name}
                  </h2>
                  {product.product_images.length > 0 && (
                    <img
                      className="lg:w-40"
                      src={product.product_images[0]?.image_url}
                      alt="product"
                    />
                  )}
                  <p>Price:{product.price}</p>
                  <p>{product.stock}</p>
                  <div className="flex lg:gap-4">
                    <button
                      className="bg-red-600 text-white lg:py-2 lg:px-4 "
                      onClick={() => handleDeleteProduct(product.slug)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-blue-600 text-white lg:py-2 lg:px-4 "
                      onClick={() => handleVisitProduct(product.slug)}
                    >
                      visit
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default ManageMyProducts;
