import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Input from "../../components/Input/Input";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useState } from "react";
import SubLoader from "../../components/Loader/SubLoader";

function NewProductRegister() {
  const [loading, setLoading] = useState(false);
  async function handleProductSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    try {
      const res = await axios.post("/api/seller/product/new", formData);
      console.log(res);
      toast.success("Product added successfully");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading && (
        <div className="fixed z-50">
          <SubLoader />
        </div>
      )}
      <Navbar />

      <div className="py-4 min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-8">
          <Toaster />
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
            New Product
          </h1>
          <form onSubmit={handleProductSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                name="name"
                placeholder="Product Name"
                className="w-full text-sm text-gray-900 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-slate-300"
              />
              <Input
                name="subName"
                placeholder="Sub Name"
                className="w-full text-sm text-gray-900 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-slate-300"
              />
              <Input
                name="price"
                placeholder="Price"
                type="number"
                className="w-full text-sm text-gray-900 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-slate-300"
              />
              <Input
                name="stock"
                placeholder="Stock"
                type="number"
                className="w-full text-sm text-gray-900 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-slate-300"
              />

              <div className="col-span-1 md:col-span-2">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="category"
                >
                  Category
                </label>
                <select
                  name="category"
                  id="category"
                  className="w-full text-sm text-gray-900 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-slate-300"
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Clothes">Clothes</option>
                  <option value="Books">Books</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Toys">Toys</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>

              <div className="col-span-1 md:col-span-2">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="images"
                >
                  Product Images
                </label>
                <input
                  type="file"
                  name="images"
                  id="images"
                  multiple
                  className="w-full text-sm text-gray-900 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-slate-300"
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="description"
              >
                Product Description
              </label>
              <textarea
                name="description"
                id="description"
                rows="5"
                className="w-full text-sm text-gray-900 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-slate-300"
                placeholder="Enter the product description here..."
              ></textarea>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full py-3 mt-6 bg-slate-700 text-white font-semibold rounded-md hover:bg-slate-800 focus:outline-none focus:ring focus:ring-slate-400"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default NewProductRegister;
