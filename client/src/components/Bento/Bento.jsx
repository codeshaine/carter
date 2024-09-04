import { Link } from "react-router-dom";

function Bento() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row gap-6 h-96">
        {/* Large Card */}
        <div className="flex-1 bg-white shadow-lg rounded-lg overflow-hidden relative ">
          <img
            src="/bento/v3.jpg"
            className="w-full h-full object-cover"
            alt="Featured"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white p-6 bg-black bg-opacity-50 rounded-lg">
              <h2 className="text-3xl font-semibold mb-2">Electronics</h2>
              <p className="text-lg">Latest gadgets and accessories.</p>
            </div>
          </div>
        </div>

        {/* Right Side Container for Small Cards */}
        <div className="flex flex-col gap-6 flex-1">
          {/* Small Card 1 */}
          <Link
            // to="/promotion"
            className="bg-white shadow-lg rounded-lg overflow-hidden relative hover:shadow-xl transition-shadow"
          >
            <img
              src="/bento/v2.jpg"
              className="w-full h-full object-cover"
              alt="Promotion"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white p-4 bg-black bg-opacity-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">Special Deals</h2>
                <p className="text-sm">Up to 50% off selected items!</p>
              </div>
            </div>
          </Link>

          {/* Small Card 2 */}
          <Link
            // to="/new-arrivals"
            className="bg-white shadow-lg rounded-lg overflow-hidden relative  hover:shadow-xl transition-shadow"
          >
            <img
              src="/bento/noting.jpg"
              className="w-full h-full object-cover"
              alt="New Arrivals"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white p-4 bg-black bg-opacity-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">New Arrivals</h2>
                <p className="text-sm">Fresh products just in!</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Bento;
