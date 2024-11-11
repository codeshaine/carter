import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import PaginationControls from "../../components/PaginationController/PaginationController";
import Loader from "../../components/Loader/Loader";
import { useFetch } from "../../hooks/useFetch";

function ManageOrderedProducts() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageNumber, setTotalPageNumber] = useState(1);
  const limit = 8;
  const [data, setData, orderError, orderLoading] = useFetch(
    `/api/seller/products/ordered-list?limit=${limit}&page=${currentPage}`,
    [(navigate, currentPage)]
  );
  useEffect(() => {
    if (data?.totalNumberOfOrders)
      setTotalPageNumber(Math.ceil(data.totalNumberOfOrders / limit));
  }, [data?.totalNumberOfOrders]);

  const markAsDelivered = async (orderId) => {
    const confirmDelivery = window.confirm(
      "Are you sure you want to mark this order as delivered?"
    );

    if (confirmDelivery) {
      try {
        await axios.post(`/api/seller/products/delivery/done/${orderId}`);
        toast.success("Order marked as delivered.");
        setData((prevItems) => ({
          ...prevItems,
          orderedItems: prevItems.orderedItems
            ? prevItems.orderedItems.map((item) =>
                item.order_id === orderId
                  ? { ...item, delivery_status: true, payment_status: true }
                  : item
              )
            : [],
        }));
      } catch (err) {
        toast.error("Failed to mark as delivered.");
      }
    }
  };

  if (orderError) console.log("Error:\nOrdered Error:", orderError);

  if (orderLoading) return <Loader />;
  return (
    <>
      <Navbar />
      <Toaster />

      <div className="p-4  bg-gray-100">
        <h1 className="text-center font-bold text-3xl  mb-6 text-gray-800">
          Our Orders
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.orderedItems?.length > 0 ? (
            data.orderedItems.map((item) => (
              <div
                key={item.order_id}
                className="bg-white p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start">
                  {/* Product Image */}
                  <img
                    src={item.product.product_images[0].image_url}
                    alt={item.product.slug}
                    className="w-24 h-24 object-cover rounded-md mr-4"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-xl text-gray-700 mb-2">
                      {item.product.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Sub Name: {item.product.sub_name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm text-gray-600">
                      Total: ₹{item.total}
                    </p>
                    <p className="text-sm text-gray-600">
                      Delivery Status:{" "}
                      <span
                        className={`font-medium ${
                          item.delivery_status
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {item.delivery_status ? "Delivered" : "Pending"}
                      </span>
                    </p>

                    <p className="text-sm text-gray-600">
                      Payment Status:{" "}
                      <span
                        className={`font-medium ${
                          item.payment_status
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {item.payment_status ? "Paid" : "Pending"}
                      </span>
                    </p>

                    {item.transaction_id && (
                      <p className="text-sm text-gray-600">
                        Tansaction ID: {item.transaction_id}
                      </p>
                    )}
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
                <div className="mt-4">
                  <button
                    onClick={() => markAsDelivered(item.order_id)}
                    disabled={item.delivery_status}
                    className={`w-full py-2 rounded-md text-white font-semibold ${
                      item.delivery_status
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-slate-700 hover:bg-slate-800"
                    } transition-colors duration-300`}
                  >
                    {item.delivery_status ? "Delivered" : "Mark as Delivered"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No orders found.</p>
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

export default ManageOrderedProducts;
