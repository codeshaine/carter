import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Input from "../../components/Input/Input";
function NewProductRegister() {
  async function hadleProductSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const res = await axios.post("/api/seller/product/new", formData);
      console.log(res);
      toast.success("Product added successfully");
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
    <div>
      <div>
        <Toaster />
      </div>
      <h1>New Product</h1>
      <form onSubmit={hadleProductSubmit}>
        <Input name="name" placeholder="Product Name" />
        <Input name="subName" placeholder="sub name" />
        <Input name="price" placeholder="price" type="number" />
        <Input name="description" placeholder="description" />
        <Input name="stock" placeholder="stock" type="number" />
        <div>
          <span className="opacity-40 font-semibold text-xs block p-1 lg:p-2">
            Product images
          </span>

          <input
            type="file"
            name="images"
            id=""
            // multiple
            placeholder="images"
            className="lg:text-lg text-sm border border-black-100 p-1 lg:p-2"
          />
        </div>
        <div className="m-2 p-2">
          <span>
            <label htmlFor="category">Category</label>
          </span>
          <select className="block py-2 border" name="category" id="">
            <option value="Electronics">Electronics</option>
            <option value="Clothes">Clothes</option>
            <option value="Books">Books</option>
            <option value="Furniture">Furniture</option>
            <option value="Toys">Toys</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <input
          type="submit"
          value="submit"
          className="lg:py-2 px-4 border m-2"
        />
      </form>
    </div>
  );
}

export default NewProductRegister;
