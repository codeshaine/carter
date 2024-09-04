// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// function SignUp() {
//   const navigate = useNavigate();
//   async function handleSubmit(e) {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const formObject = Object.fromEntries(formData.entries());
//     try {
//       await axios.post("api/seller/signup", formObject);
//       navigate("/");
//     } catch (err) {
//       if (err.response.status === 401)
//         return toast.error("Please login as user begore  proceeding");
//       console.log(err);
//       if (err.response) {
//         toast.error(err.response.data.message);
//       } else {
//         toast.error("Network Error");
//       }
//     }
//   }
//   return (
//     <>
//       <div>
//         <Toaster />
//       </div>
//       <button
//         className="bg-blue-700 text-white rounded-md px-4 py-2"
//         onClick={() => navigate("/")}
//       >
//         Home
//       </button>
//       <div className="w-full lg:p-12 pt-10">
//         <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-xl">
//           <form onSubmit={handleSubmit} className="w-full px-6 py-8 md:px-8 ">
//             <div className="flex items-center justify-between mt-4">
//               <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
//               <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
//                 Want to be a <span className="font-bold">Seller</span>?
//               </p>
//               <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
//             </div>
//             <div className="mt-4">
//               <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
//                 Seller&apos;s Name
//               </label>
//               <input
//                 id="LoggingEmailAddress"
//                 className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
//                 type="text"
//                 name="seller_name"
//               />
//             </div>
//             <div className="mt-4">
//               <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
//                 Email Address
//               </label>
//               <input
//                 id="LoggingEmailAddress"
//                 className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
//                 type="email"
//                 name="seller_email"
//               />
//             </div>
//             <div className="mt-4">
//               <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
//                 Contact Number
//               </label>
//               <input
//                 id="LoggingEmailAddress"
//                 className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
//                 type="text"
//                 name="seller_contact_number"
//               />
//             </div>
//             <div className="mt-4">
//               <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
//                 Address
//               </label>
//               <input
//                 id="LoggingEmailAddress"
//                 className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
//                 type="text"
//                 name="seller_address"
//               />
//             </div>

//             <div className="mt-6">
//               <button
//                 type="submit"
//                 className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-700 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
//               >
//                 Sign Up
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default SignUp;

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

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
      if (err.response && err.response.status === 401) {
        return toast.error("Please login as user before proceeding");
      }
      console.error(err);
      toast.error(err.response ? err.response.data.message : "Network Error");
    }
  }

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
