import Bento from "../components/Bento/Bento";
import Categorical from "../components/Categorical/Categorical";
import Footer from "../components/Footer/Footer";
import Hero from "../components/Hero/Hero";
import Navbar from "../components/Navbar/Navbar";
import Testimonials from "../components/Testimonials/Testimonials";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Bento />
      <Categorical />
      <Testimonials />
      <Footer />
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
       
         
       
        <Link
          to="/seller/product/new"
          className="text-xl hover:text-red-500 cursor-pointer border p-2 border-black bg-blue-400 text-white rounded-lg text-center"
        >
          New Product
        </Link>
        <Link
          to="/seller/product/myproducts"
          className="text-xl hover:text-red-500 cursor-pointer border p-2 border-black bg-blue-400 text-white rounded-lg text-center"
        >
          My Products
        </Link>
       
        <Link
          to="/seller/manage-orders"
          className="text-xl hover:text-red-500 cursor-pointer border p-2 border-black bg-blue-400 text-white rounded-lg text-center"
        >
          Manage Orders
        </Link>
      </div> */}
    </>
  );
}

export default Home;
