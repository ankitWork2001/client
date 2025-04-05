import React from 'react';
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaTwitter,
  FaGooglePlay,
  FaAppStoreIos
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white px-8 py-10 mt-10">
      <div className="grid grid-cols-2 md:grid-cols-6 gap-6 text-sm">
        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1">
            <li><a href="#">About Us</a></li>
            <li><a href="#">How It Works</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-semibold mb-2">Categories</h4>
          <ul className="space-y-1">
            <li><a href="#">Fashion Deals</a></li>
            <li><a href="#">Electronics Offers</a></li>
            <li><a href="#">Travel Discounts</a></li>
            <li><a href="#">Food & Dining Coupons</a></li>
            <li><a href="#">Health & Beauty Deals</a></li>
          </ul>
        </div>

        {/* Top Brands */}
        <div>
          <h4 className="font-semibold mb-2">Top Brands</h4>
          <ul className="space-y-1">
            <li><a href="#">Amazon</a></li>
            <li><a href="#">Flipkart</a></li>
            <li><a href="#">Myntra</a></li>
            <li><a href="#">Airbnb</a></li>
            <li><a href="#">Zomato</a></li>
            <li><a href="#">Swiggy</a></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h4 className="font-semibold mb-2">Customer Support</h4>
          <ul className="space-y-1">
            <li><a href="#">Live Chat Support</a></li>
            <li>Email: support@yourcouponwebsite.com</li>
            <li>Phone: +91 XXXXX XXXXX</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="font-semibold mb-2">Social Media</h4>
          <div className="flex space-x-3 text-lg">
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaYoutube /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaTwitter /></a>
          </div>
        </div>

        {/* Download App */}
        <div>
          <h4 className="font-semibold mb-2">Download Mobile App</h4>
          <div className="flex space-x-3 text-2xl">
            <a href="#"><FaGooglePlay /></a>
            <a href="#"><FaAppStoreIos /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-sm">
        © Copyright 2025. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
