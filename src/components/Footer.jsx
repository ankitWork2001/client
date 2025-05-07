import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-blue-700 text-white px-6 md:px-16 py-12 mt-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 text-sm">
        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-lg mb-4 border-b border-blue-400 pb-2">
            Quick Links
          </h4>
          <ul className="space-y-2">
            <li><Link to="/aboutus" className="hover:text-blue-200 transition">About Us</Link></li>
            <li><a href="#" className="hover:text-blue-200 transition">How It Works</a></li>
            <li><Link to="/contactus" className="hover:text-blue-200 transition">Contact Us</Link></li>
            <li><a href="#" className="hover:text-blue-200 transition">FAQs</a></li>
            <li><a href="#" className="hover:text-blue-200 transition">Blog</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-bold text-lg mb-4 border-b border-blue-400 pb-2">
            Categories
          </h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-200 transition">Sports Wear</a></li>
            <li><a href="#" className="hover:text-blue-200 transition">Electronics</a></li>
            <li><a href="#" className="hover:text-blue-200 transition">Furniture</a></li>
            <li><a href="#" className="hover:text-blue-200 transition">Watch</a></li>
            <li><a href="#" className="hover:text-blue-200 transition">Clothing</a></li>
            <li><a href="#" className="hover:text-blue-200 transition">Books</a></li>
            <li><a href="#" className="hover:text-blue-200 transition">Mobile</a></li>
            <li><a href="#" className="hover:text-blue-200 transition">Women Cloths</a></li>
            <li><a href="#" className="hover:text-blue-200 transition">Travel</a></li>
          </ul>
        </div>

        {/* Top Brands */}
        <div>
          <h4 className="font-bold text-lg mb-4 border-b border-blue-400 pb-2">
            Top Brands
          </h4>
          <ul className="space-y-2">
            <li><Link to="/store" className="hover:text-blue-200 transition">Amazon</Link></li>
            <li><Link to="/store" className="hover:text-blue-200 transition">Flipkart</Link></li>
            <li><Link to="/store" className="hover:text-blue-200 transition">Myntra</Link></li>
            <li><Link to="/store" className="hover:text-blue-200 transition">Airbnb</Link></li>
            <li><Link to="/store" className="hover:text-blue-200 transition">Puma</Link></li>
            <li><Link to="/store" className="hover:text-blue-200 transition">Rolex</Link></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h4 className="font-bold text-lg mb-4 border-b border-blue-400 pb-2">
            Customer Support
          </h4>
          <ul className="space-y-2">
            <li className="break-words">Email: support@yourcouponwebsite.com</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="font-bold text-lg mb-4 border-b border-blue-400 pb-2">
            Social Media
          </h4>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-blue-200 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-blue-200 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-blue-200 transition"><FaYoutube /></a>
            <a href="#" className="hover:text-blue-200 transition"><FaLinkedinIn /></a>
            <a href="#" className="hover:text-blue-200 transition"><FaTwitter /></a>
          </div>
        </div>

        {/* Admin Login */}
        <div className="flex flex-col justify-end">
          <Link to="/admin/login">
            <button className="bg-blue-500 hover:bg-blue-600 transition text-white px-4 py-2 rounded-md w-full hidden md:block">
              Admin Login
            </button>
          </Link>
        </div>
      </div>

      <div className="border-t border-blue-400 mt-12 pt-6 text-center">
        <p className="text-sm tracking-wide">
          © Copyright 2025.  All rights reserved.
        </p>
      </div>
    </footer>
  );
}
