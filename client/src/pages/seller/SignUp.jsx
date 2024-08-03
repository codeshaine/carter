import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData.entries());
    try {
      await axios.post("api/seller/signup", formObject);
      navigate("/");
    } catch (err) {
      console.log(err);
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Network Error");
      }
    }
  }
  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="w-full lg:p-12 pt-10">
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-xl">
          <form onSubmit={handleSubmit} className="w-full px-6 py-8 md:px-8 ">
            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
              <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
                Want to be a <span className="font-bold">Seller</span>?
              </p>
              <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
            </div>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                Seller&apos;s Name
              </label>
              <input
                id="LoggingEmailAddress"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                name="name"
              />
            </div>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                Email Address
              </label>
              <input
                id="LoggingEmailAddress"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                name="sellerEmail"
              />
            </div>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                Contact Number
              </label>
              <input
                id="LoggingEmailAddress"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                name="contactNumber"
              />
            </div>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                Address
              </label>
              <input
                id="LoggingEmailAddress"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                name="sellerAddress"
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-700 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
              >
                Sign Up
              </button>
            </div>

            {/* <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
              <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
            </div> */}
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
