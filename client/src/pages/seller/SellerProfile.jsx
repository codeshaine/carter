import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function SellerProfile() {
  let [logo, setLogo] = useState(null);
  let [sellerData, setSellerData] = useState({
    seller_name: "",
    seller_logo_url: "",
    seller_address: "",
    seller_contact_number: "",
    seller_url: "",
    seller_email: "",
    seller_bio: "",
    seller_description: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const sellerDetails = await axios.get("/api/seller");
        setSellerData((prev) => ({ ...prev, ...sellerDetails.data.data }));
      } catch (err) {
        if (err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Network Error");
        }
      }
    })();
  }, []);

  async function handleUpdateSeller() {
    sellerData["image"] = logo;
    const formData = new FormData();
    for (const key in sellerData) {
      formData.append(key, sellerData[key]);
    }
    try {
      console.log("iamge", formData["image"]);

      const res = await axios.post("/api/seller/profile/update", formData);
      console.log(res);
      toast.success("Updated successfully");
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
      <div className="flex justify-center items-center">
        <div className="bg-red-200 lg:w-2/3">
          <h1 className="font-bold lg:text-3xl ">Seller Profile</h1>
          <div>
            <div className="">
              <img
                className="rounded-full lg:w-40"
                src={sellerData.seller_logo_url}
                alt="seller profile"
              />
            </div>
            <div>
              <span className="opacity-40 font-semibold text-xs block p-1 lg:p-2">
                Full Name
              </span>
              <input
                type="text"
                name="name"
                id=""
                value={sellerData.seller_name}
                onChange={(e) => {
                  setSellerData((prev) => ({
                    ...prev,
                    seller_name: e.target.value,
                  }));
                }}
                placeholder="name"
                className="lg:text-lg text-sm border border-black-100 p-1 lg:p-2"
              />
            </div>
            <div>
              <span className="opacity-40 font-semibold text-xs block p-1 lg:p-2">
                Seller Address
              </span>
              <input
                type="text"
                name="sellerAddress"
                id=""
                value={sellerData.seller_address}
                onChange={(e) => {
                  setSellerData((prev) => ({
                    ...prev,
                    seller_address: e.target.value,
                  }));
                }}
                placeholder="address"
                className="lg:text-lg text-sm border border-black-100 p-1 lg:p-2"
              />
            </div>
            <div>
              <span className="opacity-40 font-semibold text-xs block p-1 lg:p-2">
                Contact Number
              </span>
              <input
                type="text"
                name="contactNumber"
                id=""
                value={sellerData.seller_contact_number}
                onChange={(e) => {
                  setSellerData((prev) => ({
                    ...prev,
                    seller_contact_number: e.target.value,
                  }));
                }}
                placeholder="contact number"
                className="lg:text-lg text-sm border border-black-100 p-1 lg:p-2"
              />
            </div>
            <div>
              <span className="opacity-40 font-semibold text-xs block p-1 lg:p-2">
                Email
              </span>
              <input
                type="text"
                name="sellerEmail"
                id=""
                value={sellerData.seller_email}
                onChange={(e) => {
                  setSellerData((prev) => ({
                    ...prev,
                    seller_email: e.target.value,
                  }));
                }}
                placeholder="email"
                className="lg:text-lg text-sm border border-black-100 p-1 lg:p-2"
              />
            </div>
            <div>
              <span className="opacity-40 font-semibold text-xs block p-1 lg:p-2">
                Link
              </span>
              <input
                type="text"
                name="sellerUrl"
                id=""
                value={sellerData.seller_url}
                onChange={(e) => {
                  setSellerData((prev) => ({
                    ...prev,
                    seller_url: e.target.value,
                  }));
                }}
                placeholder="link"
                className="lg:text-lg text-sm border border-black-100 p-1 lg:p-2"
              />
            </div>
            <div>
              <span className="opacity-40 font-semibold text-xs block p-1 lg:p-2">
                bio
              </span>
              <input
                type="text"
                name="bio"
                id=""
                value={sellerData.seller_bio}
                onChange={(e) => {
                  setSellerData((prev) => ({
                    ...prev,
                    seller_bio: e.target.value,
                  }));
                }}
                placeholder="bio"
                className="lg:text-lg text-sm border border-black-100 p-1 lg:p-2"
              />
            </div>
            <div>
              <span className="opacity-40 font-semibold text-xs block p-1 lg:p-2">
                description
              </span>
              <input
                type="text"
                name="description"
                id=""
                value={sellerData.seller_description}
                onChange={(e) => {
                  setSellerData((prev) => ({
                    ...prev,
                    seller_description: e.target.value,
                  }));
                }}
                placeholder="description"
                className="lg:text-lg text-sm border border-black-100 p-1 lg:p-2"
              />
            </div>
            {/* do one thing*/}
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
                  setLogo(e.target.files[0]);
                }}
              />
            </div>
          </div>
          <div className="m-2">
            <button
              onClick={handleUpdateSeller}
              className="lg:px-4 lg:py-2 py-1 px-3 lg:text-lg text-sm font-semibold bg-red-400 text-white rounded-md"
            >
              update
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SellerProfile;
