import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

function MyOrders() {
  let [orderedItems, setOrderedItems] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const resorderedItems = await axios.get(
          "/api/user/product/ordered-items"
        );
        setOrderedItems(resorderedItems.data.data);
      } catch (err) {
        toast.error(err.response.data.message);
      }
    })();
  }, []);

  const cancelOrder = async (orderId) => {
    try {
      await axios.delete(`/api/user/product/order/cancel/${orderId}`);
      toast.success("Order canceled successfully.");
      setOrderedItems((prevItems) =>
        prevItems.filter((item) => item.order_id !== orderId)
      );
    } catch (err) {
      toast.error("Failed to cancel the order.");
    }
  };

  return (
    <>
      <div>
        <Toaster />
      </div>

      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">My Orders</h1>
        <div className="space-y-4">
          {orderedItems.map((item) => (
            <div
              key={item.order_id}
              className="p-4 border rounded-md shadow-sm flex justify-between items-center"
            >
              <div className="flex items-center">
                {/* Product Image */}
                <img
                  src={item.product.product_images[0].image_url}
                  alt={item.product.slug}
                  className="w-20 h-20 object-cover rounded-md mr-4"
                />
                <div>
                  {/* <p className="font-medium"> Product: {item.product.name}</p> */}
                  <Link
                    className="font-medium underline text-blue-700"
                    to={"/product/" + item.product.slug}
                  >
                    {item.product.name}
                  </Link>

                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-sm text-gray-600">Total: ${item.total}</p>
                  <p className="text-sm text-gray-600">
                    Delivery Status:{" "}
                    {item.delivery_status ? "Delivered" : "Pending"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Ordered At: {new Date(item.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => cancelOrder(item.order_id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Cancel Order
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MyOrders;
