import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ManageOrderedProducts() {
  const [orderedItems, setOrderedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/api/seller/products/ordered-list");
        setOrderedItems(res.data.data);
        console.log(res.data.data);
      } catch (err) {
        console.log(err);
        if (err.response.status === 401) navigate("/seller/signup");
        toast.error(err.response.data.message);
      }
    })();
  }, []);

  const markAsDelivered = async (orderId) => {
    const confirmDelivery = window.confirm(
      "Are you sure you want to mark this order as delivered?"
    );

    if (confirmDelivery) {
      try {
        await axios.post(`/api/seller/products/delivery/done/${orderId}`);
        toast.success("Order marked as delivered.");
        setOrderedItems((prevItems) =>
          prevItems.map((item) =>
            item.order_id === orderId
              ? { ...item, delivery_status: true }
              : item
          )
        );
      } catch (err) {
        toast.error("Failed to mark as delivered.");
      }
    }
  };

  return (
    <>
      <div>
        <Toaster />
      </div>

      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Manage Ordered Products</h1>
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
                  <p className="font-medium">Product: {item.product.name}</p>
                  <p className="text-sm text-gray-600">
                    Sub Name: {item.product.sub_name}
                  </p>
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
                  <p className="text-sm text-gray-600">
                    Customer: {item.user.name} ({item.user.email})
                  </p>
                  <p className="text-sm text-gray-600">
                    Address: {item.address.street}, {item.address.village},{" "}
                    {item.address.taluk}, {item.address.district},{" "}
                    {item.address.state}, {item.address.pin_code}
                  </p>
                </div>
              </div>
              <button
                onClick={() => markAsDelivered(item.order_id)}
                disabled={item.delivery_status}
                className={`px-4 py-2 rounded-md text-white ${
                  item.delivery_status
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {item.delivery_status ? "Delivered" : "Mark as Delivered"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ManageOrderedProducts;
