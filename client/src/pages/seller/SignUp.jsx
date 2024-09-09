import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useState } from "react";
import Loader from "../../components/Loader/Loader";

function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData.entries());
    try {
      await axios.post("api/seller/signup", formObject);
      setTimeout(() => {
        navigate("/");
      }, 400);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        return toast.error("Please login as user before proceeding");
      }
      console.error(err);
      toast.error(err.response ? err.response.data.message : "Network Error");
    } finally {
      setLoading(false);
    }
  }
  if (loading) return <Loader />;

  return (
    <>
      <div>
        <Toaster />
      </div>
      <Navbar />
      <div className="w-full lg:p-12 pt-10">
        <div className="flex flex-col max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="w-full px-6 py-8">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
              Sign Up as a <span className="text-gray-600">Seller</span>
            </h2>

            <div className="mb-4">
              <label
                htmlFor="seller_name"
                className="block text-sm font-medium text-gray-600"
              >
                Sellers Name
              </label>
              <input
                id="seller_name"
                name="seller_name"
                className="block w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500"
                type="text"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="seller_email"
                className="block text-sm font-medium text-gray-600"
              >
                Email Address
              </label>
              <input
                id="seller_email"
                name="seller_email"
                className="block w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500"
                type="email"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="seller_contact_number"
                className="block text-sm font-medium text-gray-600"
              >
                Contact Number
              </label>
              <input
                id="seller_contact_number"
                name="seller_contact_number"
                className="block w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500"
                type="text"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="seller_address"
                className="block text-sm font-medium text-gray-600"
              >
                Address
              </label>
              <input
                id="seller_address"
                name="seller_address"
                className="block w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500"
                type="text"
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm font-medium text-white bg-gray-700 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
