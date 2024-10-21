import { useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";

const PaymentCard = ({ productList, chosenAddress, setPaymentLoader }) => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();

  const totalPrice = useMemo(() => {
    return productList.reduce((acc, item) => {
      return acc + item.quantity * item.price;
    }, 0);
  }, [productList]);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleBuyNow = async () => {
    setPaymentLoader(true);
    try {
      await axios.post("/api/user/product/purchase-now", {
        productList: productList,
        userAddress: chosenAddress,
      });
      toast.success("Product Purchased Successfully,Pay later");
    } catch (err) {
      toast.error(err.response.data.message + " Provide a valid address");
    } finally {
      setPaymentLoader(false);
    }
  };

  const hanldeCreatePaymentIntent = async () => {
    setPaymentLoader(true);
    try {
      const { data } = await axios.post("/api/user/create-payment-intent", {
        productList,
      });

      const res = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.name || "Default_Name",
            email: user.email || "default@gmail.com",
          },
        },
      });
      if (res.error) {
        // console.error("Payment failed:", res.error);
        toast.error(
          "Payment failed: " + res.error.message,
          "Order havent palced"
        );
        return;
      }
      const paymentIntent = res.paymentIntent;
      const transactionId = paymentIntent.id;

      try {
        await axios.post("/api/user/product/purchase-now", {
          productList: productList,
          userAddress: chosenAddress,
          transactionId: transactionId,
          payment_status: true,
        });
        await axios.post(`/api/user/capture-payment`, { transactionId });
        toast.success("Payment successful and product purchased!");
      } catch (orderError) {
        await axios.post(`/api/user/cancel-payment`, { transactionId });
        toast.error("Order creation failed. Payment has been cancelled!!");
      } finally {
        setPaymentLoader(false);
      }
    } catch (error) {
      console.error("Error creating payment intent:", error);
      toast.error("Failed to initiate payment");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8 gap-2 flex flex-col">
      <h2 className="text-2xl font-semibold mb-4 text-slate-900">
        Select Payment Method
      </h2>
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => handlePaymentMethodChange("offline")}
          className={`px-4 py-2 rounded-lg ${
            paymentMethod === "offline"
              ? "bg-green-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Offline Payment
        </button>
        <button
          onClick={() => handlePaymentMethodChange("online")}
          className={`px-4 py-2 rounded-lg ${
            paymentMethod === "online"
              ? "bg-green-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Online Payment
        </button>
      </div>
      <p className="text-lg mb-4">Price: ₹{totalPrice}</p>

      {paymentMethod === "offline" && (
        <button
          onClick={handleBuyNow}
          className="mt-6 text-xl bg-green-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-green-700"
        >
          Buy Now
        </button>
      )}

      {paymentMethod === "online" && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-slate-900">
            Enter Card Details
          </h2>
          <CardElement />
          <button
            onClick={hanldeCreatePaymentIntent}
            className="mt-6 text-xl bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-green-700"
          >
            Pay Now
          </button>
        </div>
      )}
    </div>
  );
};

PaymentCard.propTypes = {
  productList: PropTypes.array.isRequired,
  chosenAddress: PropTypes.number.isRequired,
  setPaymentLoader: PropTypes.func,
};

export default PaymentCard;
