import React from 'react';

const Navbar = () => {
  return (
    <>
      {/* Top Nav: Search Bar */}
      <div className="bg-white px-6 py-2 border-b">
        <div className="max-w-2xl mx-auto flex">
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

      {/* Bottom Nav: Logo + Links */}
      <nav className="bg-blue-600 text-white px-6 py-3 ">
        <div className="max-w-7xl mx-30 flex justify-between  items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-yellow-500 rounded-md p-1">
              <img
                src="https://images.unsplash.com/photo-1522780550166-284a0288c8df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YW1hem9ufGVufDB8fDB8fHww"
                alt="Logo"
                className="h-10 w-10 object-contain"
              />
            </div>
          </div>

          {/* Nav Links */}
          <div className="flex space-x-20 mx-30 text-sm">
            <a href="#" className="hover:underline">Categories</a>
            <a href="#" className="hover:underline">Top Stores</a>
            <a href="#" className="hover:underline">Best Offers</a>
            <a href="#" className="hover:underline">Collections</a>
            <a href="#" className="hover:underline">Share &amp; Earn</a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
