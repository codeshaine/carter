// import { useEffect, useState } from "react";
// import Input from "../../components/Input/Input";
// import toast, { Toaster } from "react-hot-toast";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function UserAddressForm() {
//   const [addresses, setAddresses] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await axios.get("/api/user/address");
//         setAddresses(res.data.data);
//       } catch (err) {
//         if (err.response.status === 401) navigate("/login");
//         console.log(err);
//         toast.error(err.response ? err.response.data.message : "Network Error");
//       }
//     })();
//   }, [navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const rawData = new FormData(e.target);
//     const formData = Object.fromEntries(rawData);
//     try {
//       const res = await axios.post("/api/user/address/new", formData);
//       toast.success(res.data.message);
//     } catch (err) {
//       console.log(err);
//       toast.error(err.response ? err.response.data.message : "Network Error");
//     }
//   };

//   const handleDelete = async (addressId) => {
//     try {
//       const res = await axios.delete(`/api/user/address/${addressId}`);
//       toast.success(res.data.message);
//       setAddresses((prevAddresses) =>
//         prevAddresses.filter((address) => address.user_address_id !== addressId)
//       );
//     } catch (err) {
//       console.log(err);
//       toast.error(err.response ? err.response.data.message : "Network Error");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <Toaster />
//       <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
//         <h1 className="text-2xl font-bold mb-6 text-gray-800">
//           Add New Address
//         </h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <Input
//             name="street"
//             placeholder="Street"
//             type="text"
//             labelName="Street"
//           />
//           <Input
//             name="village"
//             placeholder="Village"
//             type="text"
//             labelName="Village"
//           />
//           <Input
//             name="taluk"
//             placeholder="Taluk"
//             type="text"
//             labelName="Taluk"
//           />
//           <Input
//             name="district"
//             placeholder="District"
//             type="text"
//             labelName="District"
//           />
//           <Input
//             name="state"
//             placeholder="State"
//             type="text"
//             labelName="State"
//           />
//           <Input
//             name="contactNumber"
//             placeholder="Contact Number"
//             type="text"
//             labelName="Contact Number"
//           />
//           <Input
//             name="pinCode"
//             placeholder="Pin Code"
//             type="text"
//             labelName="Pin Code"
//           />
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
//           >
//             Submit
//           </button>
//         </form>
//       </div>

//       <div className="mt-8 max-w-lg mx-auto">
//         {addresses.length > 0 ? (
//           addresses.map((address) => (
//             <div
//               key={address.user_address_id}
//               className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200"
//             >
//               <p className="text-sm font-medium text-gray-600">
//                 <strong>Street:</strong> {address.street}
//               </p>
//               <p className="text-sm font-medium text-gray-600">
//                 <strong>Village:</strong> {address.village}
//               </p>
//               <p className="text-sm font-medium text-gray-600">
//                 <strong>Taluk:</strong> {address.taluk}
//               </p>
//               <p className="text-sm font-medium text-gray-600">
//                 <strong>District:</strong> {address.district}
//               </p>
//               <p className="text-sm font-medium text-gray-600">
//                 <strong>State:</strong> {address.state}
//               </p>
//               <p className="text-sm font-medium text-gray-600">
//                 <strong>Contact Number:</strong> {address.contact_number}
//               </p>
//               <p className="text-sm font-medium text-gray-600">
//                 <strong>Pin Code:</strong> {address.pin_code}
//               </p>
//               <button
//                 onClick={() => handleDelete(address.user_address_id)}
//                 className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
//               >
//                 Delete
//               </button>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500 text-center">No addresses available.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default UserAddressForm;

import { useEffect, useState } from "react";
import Input from "../../components/Input/Input";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function UserAddressForm() {
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/api/user/address");
        setAddresses(res.data.data);
      } catch (err) {
        if (err.response.status === 401) navigate("/login");
        console.log(err);
        toast.error(err.response ? err.response.data.message : "Network Error");
      }
    })();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const rawData = new FormData(e.target);
    const formData = Object.fromEntries(rawData);
    try {
      const res = await axios.post("/api/user/address/new", formData);
      toast.success(res.data.message);
    } catch (err) {
      console.log(err);
      toast.error(err.response ? err.response.data.message : "Network Error");
    }
  };

  const handleDelete = async (addressId) => {
    try {
      const res = await axios.delete(`/api/user/address/${addressId}`);
      toast.success(res.data.message);
      setAddresses((prevAddresses) =>
        prevAddresses.filter((address) => address.user_address_id !== addressId)
      );
    } catch (err) {
      console.log(err);
      toast.error(err.response ? err.response.data.message : "Network Error");
    }
  };

  return (
    <>
      <Navbar />
      <div className="py-4 min-h-screen bg-gradient-to-r from-slate-50 to-slate-100 p-6">
        <Toaster />
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
            <h1 className="text-2xl font-bold mb-6 text-gray-900">
              Add New Address
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="street"
                placeholder="Street"
                type="text"
                labelName="Street"
                className="w-full"
              />
              <Input
                name="village"
                placeholder="Village"
                type="text"
                labelName="Village"
                className="w-full"
              />
              <Input
                name="taluk"
                placeholder="Taluk"
                type="text"
                labelName="Taluk"
                className="w-full"
              />
              <Input
                name="district"
                placeholder="District"
                type="text"
                labelName="District"
                className="w-full"
              />
              <Input
                name="state"
                placeholder="State"
                type="text"
                labelName="State"
                className="w-full"
              />
              <Input
                name="contactNumber"
                placeholder="Contact Number"
                type="text"
                labelName="Contact Number"
                className="w-full"
              />
              <Input
                name="pinCode"
                placeholder="Pin Code"
                type="text"
                labelName="Pin Code"
                className="w-full"
              />
              <button
                type="submit"
                className="w-full bg-slate-600 text-white py-2 px-4 rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Addresses Section */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
            {addresses.length > 0 ? (
              <div>
                <h1 className="text-2xl font-bold mb-6 text-gray-900">
                  Your Addresses
                </h1>
                {addresses.map((address) => (
                  <div
                    key={address.user_address_id}
                    className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200"
                  >
                    <p className="text-sm font-medium text-gray-800">
                      <strong>Street:</strong> {address.street}
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      <strong>Village:</strong> {address.village}
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      <strong>Taluk:</strong> {address.taluk}
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      <strong>District:</strong> {address.district}
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      <strong>State:</strong> {address.state}
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      <strong>Contact Number:</strong> {address.contact_number}
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      <strong>Pin Code:</strong> {address.pin_code}
                    </p>
                    <button
                      onClick={() => handleDelete(address.user_address_id)}
                      className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center">
                No addresses available.
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserAddressForm;
