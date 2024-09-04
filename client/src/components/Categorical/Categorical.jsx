import { Link } from "react-router-dom";

// Enum-like structure for expected categories
const categories = [
  {
    name: "Electronics",
    image: "/categories/electronics.jpg",
  },
  {
    name: "Clothes",
    image: "/categories/clothes.jpg",
  },
  {
    name: "Books",
    image: "/categories/books.jpg",
  },
  {
    name: "Furniture",
    image: "/categories/furnitures.jpg",
  },
  {
    name: "Toys",
    image: "/categories/toys.jpg",
  },
  {
    name: "Accessories",
    image: "/categories/accessories.jpg",
  },
];

function Categorical() {
  return (
    <div className="bg-gradient-to-r from-white to-slate-100 py-16">
      <div className="container mx-auto px-8">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-12 text-center">
          Explore Our Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/product-list/all?cat=${encodeURIComponent(category.name)}`}
              className="relative bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                <h3 className="text-2xl font-semibold text-white shadow-md">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categorical;
