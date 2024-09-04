// import axios from "axios";
// import { useEffect, useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// function UserProfile() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [profile, setProfile] = useState(null);
//   const [profilePicUrl, setProfilePicUrl] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     (async () => {
//       try {
//         const { data } = await axios.get("/api/user");
//         setName(data.data.name);
//         setProfilePicUrl(data.data.profile_url);
//         setEmail(data.data.email);
//       } catch (err) {
//         console.log(err);
//         if (err.response.status === 401) navigate("/login");
//         if (err.response) {
//           toast.error(err.response.data.message);
//         } else {
//           toast.error("Network Error");
//         }
//       }
//     })();
//   }, [navigate]);

//   const handleUserUpdate = async () => {
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("image", profile);

//     try {
//       await axios.post("/api/user/profile/update", formData);
//       toast.success("Updated successfully");
//     } catch (err) {
//       if (err.response) {
//         toast.error(err.response.data.message);
//       } else {
//         toast.error("Network Error");
//       }
//     }
//   };

//   const handleUserLogout = async () => {
//     try {
//       const { data } = await axios.get("/api/user/logout");
//       toast.success(data.data.message);
//     } catch (err) {
//       if (err.response) {
//         toast.error(err.response.data.message);
//       } else {
//         toast.error("Network Error");
//       }
//     }
//   };

//   return (
//     <>
//       <Toaster />
//       <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-slate-200 to-white p-4">
//         <div className="bg-white shadow-lg rounded-lg max-w-lg w-full">
//           <div className="p-6 flex flex-col items-center">
//             <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
//               User Profile
//             </h1>
//             <img
//               src={profilePicUrl}
//               alt="User Profile"
//               className="w-32 h-32 rounded-full mb-6 object-cover shadow-md"
//             />
//             <div className="w-full mb-6">
//               <label className="block text-sm font-semibold text-gray-600 mb-2">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Enter your name"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
//               />
//             </div>
//             <div className="w-full mb-6">
//               <label className="block text-sm font-semibold text-gray-600 mb-2">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 value={email}
//                 disabled
//                 placeholder="Email"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed focus:outline-none"
//               />
//             </div>
//             <div className="w-full mb-6">
//               <label className="block text-sm font-semibold text-gray-600 mb-2">
//                 Profile Image
//               </label>
//               <input
//                 type="file"
//                 onChange={(e) => setProfile(e.target.files[0])}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
//               />
//             </div>
//             <div className="flex gap-4 w-full">
//               <button
//                 onClick={handleUserUpdate}
//                 className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-all"
//               >
//                 Update
//               </button>
//               <button
//                 className="w-full bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-all"
//                 onClick={() => navigate("/user/addresses")}
//               >
//                 View Addresses
//               </button>
//               <button
//                 onClick={handleUserLogout}
//                 className="w-full bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-all"
//               >
//                 Log Out
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default UserProfile;
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function UserProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/user");
        setName(data.data.name);
        setProfilePicUrl(data.data.profile_url);
        setEmail(data.data.email);
      } catch (err) {
        console.log(err);
        if (err.response.status === 401) navigate("/login");
        if (err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Network Error");
        }
      }
    })();
  }, [navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicUrl(reader.result);
        setProfile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUserUpdate = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", profile);

    try {
      await axios.post("/api/user/profile/update", formData);
      toast.success("Updated successfully");
    } catch (err) {
      setError(err.response ? err.response.data.message : "Network Error");
    }
  };

  const handleUserLogout = async () => {
    try {
      const response = await axios.post("/api/user/logout");
      toast.success(response.data.message);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <>
      <Navbar />
      <Toaster />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-slate-300 my-2 to-white p-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            <div className="w-full h-48 p-4 bg-gray-100 rounded-t-lg relative">
              <img
                src={profilePicUrl || "default-profile-pic-url"}
                alt="User Profile"
                className="w-full h-full object-contain rounded-t-lg"
              />
              <label className="absolute bottom-4 right-4 bg-white p-2 rounded-full border border-gray-300 shadow-lg cursor-pointer">
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
                  id="profile"
                  type="file"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </label>
            </div>
          </div>
          <div className="p-6">
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                disabled
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleUserUpdate}
                className="w-full bg-slate-800 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-slate-700 transition-colors"
              >
                Update
              </button>

              <button
                onClick={handleUserLogout}
                className="w-full bg-red-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-red-400 transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserProfile;
