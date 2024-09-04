// import axios from "axios";
// import { useEffect, useState } from "react";
// import toast, { Toaster } from "react-hot-toast";

// function SellerProfile() {
//   let [logo, setLogo] = useState(null);
//   let [sellerData, setSellerData] = useState({
//     seller_name: "",
//     seller_logo_url: "",
//     seller_address: "",
//     seller_contact_number: "",
//     seller_url: "",
//     seller_email: "",
//     seller_bio: "",
//     seller_description: "",
//   });

//   useEffect(() => {
//     (async () => {
//       try {
//         const sellerDetails = await axios.get("/api/seller");
//         setSellerData((prev) => ({ ...prev, ...sellerDetails.data.data }));
//       } catch (err) {
//         if (err.response) {
//           toast.error(err.response.data.message);
//         } else {
//           toast.error("Network Error");
//         }
//       }
//     })();
//   }, []);

//   async function handleUpdateSeller() {
//     sellerData["image"] = logo;
//     const formData = new FormData();
//     for (const key in sellerData) {
//       formData.append(key, sellerData[key]);
//     }
//     try {
//       console.log("iamge", formData["image"]);

//       const res = await axios.post("/api/seller/profile/update", formData);
//       console.log(res);
//       toast.success("Updated successfully");
//     } catch (err) {
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
//       <div className="flex justify-center items-center">
//         <div className="bg-red-200 lg:w-2/3">
//           <h1 className="font-bold lg:text-3xl ">Seller Profile</h1>
//           <div>
//             <div className="">
//               <img
//                 className="rounded-full lg:w-40"
//                 src={sellerData.seller_logo_url}
//                 alt="seller profile"
//               />
//             </div>
//             <div>
//               <span className="opacity-40 font-semibold text-xs block p-1 lg:p-2">
//                 Full Name
//               </span>
//               <input
//                 type="text"
//                 name="name"
//                 id=""
//                 value={sellerData.seller_name}
//                 onChange={(e) => {
//                   setSellerData((prev) => ({
//                     ...prev,
//                     seller_name: e.target.value,
//                   }));
//                 }}
//                 placeholder="name"
//                 className="lg:text-lg text-sm border border-black-100 p-1 lg:p-2"
//               />
//             </div>
//             <div>
//               <span className="opacity-40 font-semibold text-xs block p-1 lg:p-2">
//                 Seller Address
//               </span>
//               <input
//                 type="text"
//                 name="sellerAddress"
//                 id=""
//                 value={sellerData.seller_address}
//                 onChange={(e) => {
//                   setSellerData((prev) => ({
//                     ...prev,
//                     seller_address: e.target.value,
//                   }));
//                 }}
//                 placeholder="address"
//                 className="lg:text-lg text-sm border border-black-100 p-1 lg:p-2"
//               />
//             </div>
//             <div>
//               <span className="opacity-40 font-semibold text-xs block p-1 lg:p-2">
//                 Contact Number
//               </span>
//               <input
//                 type="text"
//                 name="contactNumber"
//                 id=""
//                 value={sellerData.seller_contact_number}
//                 onChange={(e) => {
//                   setSellerData((prev) => ({
//                     ...prev,
//                     seller_contact_number: e.target.value,
//                   }));
//                 }}
//                 placeholder="contact number"
//                 className="lg:text-lg text-sm border border-black-100 p-1 lg:p-2"
//               />
//             </div>
//             <div>
//               <span className="opacity-40 font-semibold text-xs block p-1 lg:p-2">
//                 Email
//               </span>
//               <input
//                 type="text"
//                 name="sellerEmail"
//                 id=""
//                 value={sellerData.seller_email}
//                 onChange={(e) => {
//                   setSellerData((prev) => ({
//                     ...prev,
//                     seller_email: e.target.value,
//                   }));
//                 }}
//                 placeholder="email"
//                 className="lg:text-lg text-sm border border-black-100 p-1 lg:p-2"
//               />
//             </div>
//             <div>
//               <span className="opacity-40 font-semibold text-xs block p-1 lg:p-2">
//                 Link
//               </span>
//               <input
//                 type="text"
//                 name="sellerUrl"
//                 id=""
//                 value={sellerData.seller_url}
//                 onChange={(e) => {
//                   setSellerData((prev) => ({
//                     ...prev,
//                     seller_url: e.target.value,
//                   }));
//                 }}
//                 placeholder="link"
//                 className="lg:text-lg text-sm border border-black-100 p-1 lg:p-2"
//               />
//             </div>
//             <div>
//               <span className="opacity-40 font-semibold text-xs block p-1 lg:p-2">
//                 bio
//               </span>
//               <input
//                 type="text"
//                 name="bio"
//                 id=""
//                 value={sellerData.seller_bio}
//                 onChange={(e) => {
//                   setSellerData((prev) => ({
//                     ...prev,
//                     seller_bio: e.target.value,
//                   }));
//                 }}
//                 placeholder="bio"
//                 className="lg:text-lg text-sm border border-black-100 p-1 lg:p-2"
//               />
//             </div>
//             <div>
//               <span className="opacity-40 font-semibold text-xs block p-1 lg:p-2">
//                 description
//               </span>
//               <input
//                 type="text"
//                 name="description"
//                 id=""
//                 value={sellerData.seller_description}
//                 onChange={(e) => {
//                   setSellerData((prev) => ({
//                     ...prev,
//                     seller_description: e.target.value,
//                   }));
//                 }}
//                 placeholder="description"
//                 className="lg:text-lg text-sm border border-black-100 p-1 lg:p-2"
//               />
//             </div>
//             {/* do one thing*/}
//             <div>
//               <span className="opacity-40 font-semibold text-sm block lg:p-2">
//                 Profile Image
//               </span>
//               <input
//                 className="lg:text-md text-sm"
//                 type="file"
//                 name="image"
//                 id=""
//                 onChange={(e) => {
//                   setLogo(e.target.files[0]);
//                 }}
//               />
//             </div>
//           </div>
//           <div className="m-2">
//             <button
//               onClick={handleUpdateSeller}
//               className="lg:px-4 lg:py-2 py-1 px-3 lg:text-lg text-sm font-semibold bg-red-400 text-white rounded-md"
//             >
//               update
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default SellerProfile;

import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function SellerProfile() {
  const [logo, setLogo] = useState(null);
  const [sellerData, setSellerData] = useState({
    seller_name: "",
    seller_logo_url: "",
    seller_address: "",
    seller_contact_number: "",
    seller_url: "",
    seller_email: "",
    seller_bio: "",
    seller_description: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/seller");
        setSellerData((prev) => ({ ...prev, ...data.data }));
      } catch (err) {
        console.log(err);
        if (err.response.status === 401) navigate("/seller/signup");
        if (err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Network Error");
        }
      }
    })();
  }, [navigate]);

  const handleUpdateSeller = async () => {
    const formData = new FormData();
    for (const key in sellerData) {
      formData.append(key, sellerData[key]);
    }
    if (logo) formData.append("image", logo);

    try {
      await axios.post("/api/seller/profile/update", formData);
      toast.success("Updated successfully");
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Network Error");
      }
    }
  };

  return (
    <>
      <Navbar />
      <Toaster />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-100 to-white p-6">
        <div className="bg-white shadow-lg rounded-lg max-w-5xl w-full p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-6">
              <img
                src={sellerData.seller_logo_url || "default-logo-url"}
                alt="Seller Logo"
                className="w-32 h-32 rounded-full object-cover border-4 border-slate-300 shadow-md"
              />
              <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full border border-gray-300 shadow-lg cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0l-2-2a4 4 0 015.656-5.656l2 2a4 4 0 010 5.656zM7 12h.01M12 7h.01M12 17h.01M12 12h.01"
                  />
                </svg>
                <input
                  id="logo"
                  type="file"
                  onChange={(e) => setLogo(e.target.files[0])}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </label>
            </div>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-600 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={sellerData.seller_name}
                  onChange={(e) =>
                    setSellerData((prev) => ({
                      ...prev,
                      seller_name: e.target.value,
                    }))
                  }
                  placeholder="Full Name"
                  className="px-4 py-2 border border-slate-300 rounded-md bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-600 mb-2">
                  Contact Number
                </label>
                <input
                  type="text"
                  value={sellerData.seller_contact_number}
                  onChange={(e) =>
                    setSellerData((prev) => ({
                      ...prev,
                      seller_contact_number: e.target.value,
                    }))
                  }
                  placeholder="Contact Number"
                  className="px-4 py-2 border border-slate-300 rounded-md bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-600 mb-2">
                  Email
                </label>
                <input
                  type="text"
                  value={sellerData.seller_email}
                  onChange={(e) =>
                    setSellerData((prev) => ({
                      ...prev,
                      seller_email: e.target.value,
                    }))
                  }
                  placeholder="Email"
                  className="px-4 py-2 border border-slate-300 rounded-md bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-600 mb-2">
                  Website Link
                </label>
                <input
                  type="text"
                  value={sellerData.seller_url}
                  onChange={(e) =>
                    setSellerData((prev) => ({
                      ...prev,
                      seller_url: e.target.value,
                    }))
                  }
                  placeholder="Website Link"
                  className="px-4 py-2 border border-slate-300 rounded-md bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-600 mb-2">
                  Bio
                </label>
                <textarea
                  value={sellerData.seller_bio}
                  onChange={(e) =>
                    setSellerData((prev) => ({
                      ...prev,
                      seller_bio: e.target.value,
                    }))
                  }
                  placeholder="Bio"
                  rows="4"
                  className="px-4 py-2 border border-slate-300 rounded-md bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-600 mb-2">
                  Address
                </label>
                <textarea
                  value={sellerData.seller_address}
                  onChange={(e) =>
                    setSellerData((prev) => ({
                      ...prev,
                      seller_address: e.target.value,
                    }))
                  }
                  placeholder="Address"
                  rows="4"
                  className="px-4 py-2 border border-slate-300 rounded-md bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>
            </div>
            <div className="flex flex-col mb-6">
              <label className="text-sm font-semibold text-slate-600 mb-2">
                Description
              </label>
              <textarea
                value={sellerData.seller_description}
                onChange={(e) =>
                  setSellerData((prev) => ({
                    ...prev,
                    seller_description: e.target.value,
                  }))
                }
                placeholder="Description"
                rows="6"
                className="px-4 py-2 border border-slate-300 rounded-md bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
            <div className="mt-6">
              <button
                onClick={handleUpdateSeller}
                className="w-full px-4 py-2 text-lg font-semibold bg-slate-600 text-white rounded-md hover:bg-slate-700 transition"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SellerProfile;
