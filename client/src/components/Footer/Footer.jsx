import { memo } from "react";
import { Link } from "react-router-dom";

const Footer = memo(function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-200 to-white py-12">
      <div className="container mx-auto px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* About Us Section */}
        <div>
          <h3 className="text-xl font-extrabold text-gray-800 mb-4">
            About Carter
          </h3>
          <p className="text-gray-600">
            Carter is your go-to platform for discovering and purchasing the
            best products at unbeatable prices. Shop with confidence, knowing
            you are getting the best deals on top brands.
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-xl font-extrabold text-gray-800 mb-4">
            Quick Links
          </h3>
          <ul className="text-gray-600 space-y-2">
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/terms">Terms of Service</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        {/* Customer Service Section */}
        <div>
          <h3 className="text-xl font-extrabold text-gray-800 mb-4">
            Customer Service
          </h3>
          <ul className="text-gray-600 space-y-2">
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
            <li>
              <Link to="/returns">Return Policy</Link>
            </li>
            <li>
              <Link to="/shipping">Shipping Information</Link>
            </li>
            <li>
              <Link to="/support">Support</Link>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div>
          <h3 className="text-xl font-extrabold text-gray-800 mb-4">
            Follow Us
          </h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/footer/facebook.png"
                alt="Facebook"
                className="w-8 h-8"
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/footer/instagram.png"
                alt="Instagram"
                className="w-8 h-8"
              />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/footer/twitter.png"
                alt="Twitter"
                className="w-8 h-8"
              />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/footer/linked-in.png"
                alt="LinkedIn"
                className="w-8 h-8"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-300 mt-8 pt-8 text-center text-gray-600">
        <p>&copy; 2024 Carter. All rights reserved.</p>
        <p>Designed with ❤️ by Shaine</p>
      </div>
    </footer>
  );
});

export default Footer;
