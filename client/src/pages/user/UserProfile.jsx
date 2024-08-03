import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function UserProfile() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [profile, setProfile] = useState(null);
  let [profilePicUrl, setProfilePicUrl] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const userData = await axios.get("/api/user");
        // if (!userData) {
        //   throw new Error("network error");
        // }
        setName(userData.data.data.name);
        setProfilePicUrl(userData.data.data.profile_url);
        setEmail(userData.data.data.email);
        console.log(userData.data.data);
      } catch (err) {
        if (err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Network Error");
        }
      }
    })();
  }, []);
  async function handleUserUpdate() {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", profile);
    try {
      const res = await axios.post("api/user/profile/update", formData);
      console.log(res);
      toast.success("Updated successfully");
    } catch (err) {
      if (err.response && err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Network Error");
      }
    }
  }
  async function handleUserLogout() {
    try {
      const res = await axios.get("api/user/logout");
      // console.log(res);
      toast.success(res.data.data.message);
    } catch (err) {
      console.log(err);
      if (err.response && err.response) {
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
      <div className="w-screen h-screen flex lg:justify-center gap-28 lg:items-center mt-10">
        <div className="w-2/3 lg:1/3 bg-blue-300 flex justify-center lg:p-4">
          <div className=" flex flex-col  items-center gap-4 lg:w-1/2 bg-violet-50 lg:p-4">
            <h1 className="font-bold lg:text-4xl text-2xl text-center">
              User Profile
            </h1>
            <img
              src={profilePicUrl}
              alt="user_profile"
              className="lg:w-36 md:w-20 w-20 rounded-full"
            />

            <div>
              <span className="opacity-40 font-semibold text-xs block p-1 lg:p-2">
                Full Name
              </span>
              <input
                type="text"
                name="name"
                id=""
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="name"
                className="lg:text-lg text-sm border border-black-100 p-1 lg:p-2"
              />
            </div>
            <div>
              <span className="opacity-40 font-semibold text-xs block p-1 lg:p-2">
                Email
              </span>
              <input
                type="email"
                name="name"
                id=""
                value={email}
                disabled
                placeholder="email"
                className="lg:text-lg text-sm border border-black-100 lg:p-2"
              />
            </div>
            <div>
              <span className="opacity-40 font-semibold text-sm block lg:p-2">
                Profile Image
              </span>
              <input
                className="lg:text-md text-sm"
                type="file"
                name="image"
                id=""
                onChange={(e) => {
                  setProfile(e.target.files[0]);
                }}
              />
            </div>
            <div className="flex lg:gap-5">
              <button
                onClick={handleUserUpdate}
                className="lg:px-4 lg:py-2  py-1 px-3 lg:text-lg  text-sm font-semibold bg-blue-400 text-white rounded-md"
              >
                Update
              </button>
              <button className="lg:px-4 lg:py-2 py-1 px-3 lg:text-lg text-sm font-semibold bg-red-400 text-white rounded-md">
                View Addresses
              </button>
              <button
                onClick={handleUserLogout}
                className="lg:px-4 lg:py-2 py-1 px-3 lg:text-lg text-sm font-semibold bg-red-400 text-white rounded-md"
              >
                log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
