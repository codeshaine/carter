import { useEffect, useState } from "react";
import Input from "../../components/Input/Input";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function UserAddressForm() {
  const [formData, setFormData] = useState({
    street: "",
    village: "",
    taluk: "",
    district: "",
    state: "",
    contactNumber: "",
    pinCode: "",
  });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };
  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/api/user/address");
        // console.log(res.data.data);
        setAddresses(res.data.data);
        // toast.success(res.data.message);
      } catch (err) {
        console.log(err);
        if (err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Network Error");
        }
      }
    })();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target);
    const rawData = new FormData(e.target);
    const formData = Object.fromEntries(rawData);
    try {
      const res = await axios.post("/api/user/address/new", formData);
      toast.success(res.data.message);
    } catch (err) {
      console.log(err);
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Network Error");
      }
    }
  };

  const handleDelete = async (addressId) => {
    try {
      const res = await axios.delete("/api/user/address/" + addressId);
      toast.success(res.data.message);
    } catch (err) {
      console.log(err);
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Network Error");
      }
    }
  };

  return (
    <div>
      <div>
        <Toaster />{" "}
      </div>

      <form onSubmit={handleSubmit}>
        <Input
          name="street"
          placeholder="Street"
          type="text"
          labelName="Street"
        />
        <Input
          name="village"
          placeholder="Village"
          type="text"
          labelName="Village"
        />
        <Input name="taluk" placeholder="Taluk" type="text" labelName="Taluk" />
        <Input
          name="district"
          placeholder="District"
          type="text"
          labelName="District"
        />
        <Input name="state" placeholder="State" type="text" labelName="State" />
        <Input
          name="contactNumber"
          placeholder="Contact Number"
          type="text"
          labelName="Contact Number"
        />
        <Input
          name="pinCode"
          placeholder="Pin Code"
          type="text"
          labelName="Pin Code"
        />
        <button type="submit">Submit</button>
      </form>

      <div className="mt-8">
        {addresses.length > 0 ? (
          addresses.map((address, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200"
            >
              <p className="text-sm font-medium text-gray-600">
                <strong>Street:</strong> {address.street}
              </p>
              <p className="text-sm font-medium text-gray-600">
                <strong>Village:</strong> {address.village}
              </p>
              <p className="text-sm font-medium text-gray-600">
                <strong>Taluk:</strong> {address.taluk}
              </p>
              <p className="text-sm font-medium text-gray-600">
                <strong>District:</strong> {address.district}
              </p>
              <p className="text-sm font-medium text-gray-600">
                <strong>State:</strong> {address.state}
              </p>
              <p className="text-sm font-medium text-gray-600">
                <strong>Contact Number:</strong> {address.contact_number}
              </p>
              <p className="text-sm font-medium text-gray-600">
                <strong>Pin Code:</strong> {address.pin_code}
              </p>
              <button
                onClick={() => handleDelete(address.user_address_id)}
                className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No addresses available.</p>
        )}
      </div>
    </div>
  );
}

export default UserAddressForm;
