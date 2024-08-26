// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import Input from "../../components/Input/Input";
// function NewProductRegister() {
//   async function hadleProductSubmit(e) {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     try {
//       const res = await axios.post("/api/seller/product/new", formData);
//       console.log(res);
//       toast.success("Product added successfully");
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
//     <div>
//       <div>
//         <Toaster />
//       </div>
//       <h1>New Product</h1>
//       <form onSubmit={hadleProductSubmit}>
//         <Input name="name" placeholder="Product Name" />
//         <Input name="subName" placeholder="sub name" />
//         <Input name="price" placeholder="price" type="number" />
//         <Input name="description" placeholder="description" />
//         <Input name="stock" placeholder="stock" type="number" />
//         <div>
//           <span className="opacity-40 font-semibold text-xs block p-1 lg:p-2">
//             Product images
//           </span>

//           <input
//             type="file"
//             name="images"
//             id=""
//             // multiple
//             placeholder="images"
//             className="lg:text-lg text-sm border border-black-100 p-1 lg:p-2"
//           />
//         </div>
//         <div className="m-2 p-2">
//           <span>
//             <label htmlFor="category">Category</label>
//           </span>
//           <select className="block py-2 border" name="category" id="">
//             <option value="Electronics">Electronics</option>
//             <option value="Clothes">Clothes</option>
//             <option value="Books">Books</option>
//             <option value="Furniture">Furniture</option>
//             <option value="Toys">Toys</option>
//             <option value="Others">Others</option>
//           </select>
//         </div>
//         <input
//           type="submit"
//           value="submit"
//           className="lg:py-2 px-4 border m-2"
//         />
//       </form>
//     </div>
//   );
// }

// export default NewProductRegister;

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Input from "../../components/Input/Input";
import { useNavigate } from "react-router-dom";

function NewProductRegister() {
  const navigate = useNavigate();
  async function handleProductSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const res = await axios.post("/api/seller/product/new", formData);
      console.log(res);
      toast.success("Product added successfully");
    } catch (err) {
      if (err.response.status === 401) navigate("/login");
      console.log(err);
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Network Error");
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
        <Toaster />
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          New Product
        </h1>
        <form onSubmit={handleProductSubmit} className="space-y-4">
          <Input name="name" placeholder="Product Name" />
          <Input name="subName" placeholder="Sub Name" />
          <Input name="price" placeholder="Price" type="number" />
          <Input name="description" placeholder="Description" />
          <Input name="stock" placeholder="Stock" type="number" />

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-1"
              htmlFor="images"
            >
              Product Images
            </label>
            <input
              type="file"
              name="images"
              id="images"
              multiple
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-1"
              htmlFor="category"
            >
              Category
            </label>
            <select
              name="category"
              id="category"
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="Electronics">Electronics</option>
              <option value="Clothes">Clothes</option>
              <option value="Books">Books</option>
              <option value="Furniture">Furniture</option>
              <option value="Toys">Toys</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewProductRegister;
