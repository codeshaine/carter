import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState("");
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
  }, []);

  const handleUserUpdate = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", profile);

    try {
      await axios.post("/api/user/profile/update", formData);
      toast.success("Updated successfully");
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Network Error");
      }
    }
  };

  const handleUserLogout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      toast.success(data.data.message);
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
      <Toaster />
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white shadow-lg rounded-lg max-w-md w-full">
          <div className="p-6 flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">User Profile</h1>
            <img
              src={profilePicUrl}
              alt="User Profile"
              className="w-24 h-24 rounded-full mb-4 object-cover"
            />
            <div className="w-full mb-4">
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="w-full mb-4">
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                disabled
                placeholder="Email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-200 cursor-not-allowed"
              />
            </div>
            <div className="w-full mb-4">
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Profile Image
              </label>
              <input
                type="file"
                onChange={(e) => setProfile(e.target.files[0])}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex gap-4 mt-4 w-full">
              <button
                onClick={handleUserUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
              >
                Update
              </button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition">
                View Addresses
              </button>
              <button
                onClick={handleUserLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
