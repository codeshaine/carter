import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="bg-gradient-to-r from-white to-slate-200 py-16">
      <div className="container mx-auto px-8 flex flex-col items-center text-center">
        <h1 className="text-6xl font-extrabold text-gray-800 mb-4">
          Discover Amazing Products at Unbeatable Prices
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Shop now and enjoy the best deals on top brands!
        </p>
        <Link
          to="/product-list/all"
          className="px-8 py-4 bg-gradient-to-r from-slate-300 to-white text-lg rounded-full shadow-md hover:from-white hover:to-slate-300 transition-colors"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}

export default Hero;
