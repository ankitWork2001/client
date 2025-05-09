import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCategoryId, setCategoryName } from "../redux/categorySlice";
import { resetStore } from "../redux/storeSlice";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../../assets/Logo3.jpg"; // Your imported logo

const Navbar = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Top Section: Logo + Search Bar */}
      <div className="bg-white px-4 py-3 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 sm:gap-8">
          {/* Logo Section (remains as you had it) */}
          <Link to="/" className="flex items-center">
            <div className="relative">
              <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center shadow-md transform -translate-y-1 hover:scale-105 transition-transform">
                <img
                  src={Logo}
                  alt="Logo"
                  className="w-16 h-16 object-contain p-1"
                />
              </div>
            </div>
          </Link>
  
          {/* Search Bar */}
          <div className="flex flex-1">
            <input
              type="text"
              placeholder="Search for deals, stores, etc."
              className="w-full border border-gray-300 rounded-l-md px-4 py-2 text-black focus:outline-none"
            />
            <button className="bg-orange-500 text-white px-4 py-2 rounded-r-md hover:bg-orange-600">
              Search
            </button>
          </div>
        </div>
      </div>
  
      {/* Navigation Bar */}
      <nav className="bg-blue-600 text-white px-4 py-3 shadow-md relative">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          {/* Hamburger (Mobile) */}
          <button onClick={() => setIsOpen(!isOpen)} className="sm:hidden">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
  
          {/* Nav Links (Desktop) */}
          <div className="hidden sm:flex gap-12 text-md font-medium mx-auto">
            <Link
              to="/category"
              className="hover:underline transition"
              onClick={() => {
                dispatch(setCategoryId(null));
                dispatch(setCategoryName("All Categories"));
              }}
            >
              Categories
            </Link>
            <Link
              to="/store"
              className="hover:underline transition"
              onClick={() => dispatch(resetStore())}
            >
              Top Stores
            </Link>
            <Link to="/dealofday" className="hover:underline transition">
              Deals of the Day
            </Link>
            <Link to="#" className="hover:underline transition">
              Share & Earn
            </Link>
          </div>
        </div>
  
        {/* Mobile Menu */}
        {isOpen && (
          <div className="sm:hidden mt-4 space-y-4 px-4 text-base font-medium">
            <Link
              to="/category"
              className="hover:underline block"
              onClick={() => {
                dispatch(setCategoryId(null));
                dispatch(setCategoryName("All Categories"));
                setIsOpen(false);
              }}
            >
              Categories
            </Link>
            <Link
              to="/store"
              className="hover:underline block"
              onClick={() => {
                dispatch(resetStore());
                setIsOpen(false);
              }}
            >
              Top Stores
            </Link>
            <Link
              to="/dealofday"
              className="hover:underline block"
              onClick={() => setIsOpen(false)}
            >
              Deals of the Day
            </Link>
            <Link
              to="#"
              className="hover:underline block"
              onClick={() => setIsOpen(false)}
            >
              Share & Earn
            </Link>
          </div>
        )}
      </nav>
    </>
  );
  
};

export default Navbar;
