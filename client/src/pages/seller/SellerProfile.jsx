import axios from "axios";
import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useFetch } from "../../hooks/useFetch";
import Loader from "../../components/Loader/Loader";
import SubLoader from "../../components/Loader/SubLoader";

function SellerProfile() {
  const [logo, setLogo] = useState(null);
  const navigate = useNavigate();
  const profilePicUrl = useRef(null);
  const [loading, setLoading] = useState(false);

  const [sellerData, setSellerData, sellerError, sellerLoading] = useFetch(
    "/api/seller",
    [navigate]
  );
  // profilePicUrl.current = sellerData.seller_logo_url;
  const handleUpdateSeller = async () => {
    const formData = new FormData();
    for (const key in sellerData) {
      formData.append(key, sellerData[key]);
    }
    if (logo) formData.append("image", logo);

    try {
      setLoading(true);
      await axios.post("/api/seller/profile/update", formData);
      toast.success("Updated successfully");
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Network Error");
      }
    } finally {
      setLoading(false);
    }
  };
  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        profilePicUrl.current = reader.result;
        setLogo(file);
      };
      reader.readAsDataURL(file);
    }
  }
  if (!profilePicUrl.current) {
    profilePicUrl.current = sellerData.seller_logo_url;
  }
  if (sellerError) console.log("Error:\n seller error:", sellerError);
  if (sellerLoading) return <Loader />;

  return (
    <>
      {loading && (
        <div className="fixed z-50">
          <SubLoader />
        </div>
      )}
      <Navbar />
      <Toaster />
      <div className="flex justify-center items-center min-h-screen p-6">
        <div className="bg-white shadow-lg rounded-lg max-w-5xl w-full p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-6">
              <img
                src={profilePicUrl.current || "default"}
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
                  onChange={handleFileChange}
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
                disabled={loading}
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
