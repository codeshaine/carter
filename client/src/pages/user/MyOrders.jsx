import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function MyOrders() {
  const [orderedItems, setOrderedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const resorderedItems = await axios.get(
          "/api/user/product/ordered-items"
        );
        setOrderedItems(resorderedItems.data.data);
      } catch (err) {
        if (err.response.status === 401) navigate("/login");
        toast.error(err.response.data.message);
      }
    })();
  }, [navigate]);

  const cancelOrder = async (orderId) => {
    const confirmPrice = confirm("Are you sure you want to cancel the order?");
    if (confirmPrice) {
      try {
        await axios.delete(`/api/user/product/order/cancel/${orderId}`);
        toast.success("Order canceled successfully.");
        setOrderedItems((prevItems) =>
          prevItems.filter((item) => item.order_id !== orderId)
        );
      } catch (err) {
        toast.error("Failed to cancel the order.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <Toaster />
      </div>

      <div className="p-6 my-4 bg-gray-100">
        <div className="space-y-6">
          {orderedItems.length > 0 ? (
            orderedItems.map((item) => (
              <div
                key={item.order_id}
                className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 flex flex-col md:flex-row justify-between items-start"
              >
                <div className="flex items-center mb-4 md:mb-0">
                  {/* Product Image */}
                  <img
                    src={item.product.product_images[0].image_url}
                    alt={item.product.slug}
                    className="w-32 h-32 object-cover rounded-md mr-6"
                  />
                  <div className="max-w-xs">
                    <Link
                      className="text-lg font-semibold text-slate-800 hover:text-slate-600 hover:underline"
                      to={"/product/" + item.product.slug}
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-base text-gray-700 mt-2">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-base text-gray-700 mt-2">
                      Total: ₹{item.total}
                    </p>
                    <p
                      className={`text-base mt-2 ${
                        item.delivery_status ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      Delivery Status:{" "}
                      {item.delivery_status ? "Delivered" : "Pending"}
                    </p>
                    <p className="text-base text-gray-700 mt-2">
                      Ordered At: {new Date(item.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
                <button
                  disabled={item.delivery_status}
                  onClick={() => cancelOrder(item.order_id)}
                  className={`px-4 py-2 mt-4 md:mt-0 text-white rounded-md ${
                    item.delivery_status
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {item.delivery_status ? "Order Delivered" : "Cancel Order"}
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center text-lg">
              No orders available.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyOrders;
