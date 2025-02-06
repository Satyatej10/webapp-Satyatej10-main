// Navbar component with transparent background
import React from 'react';
import { FaHome, FaSearch, FaUtensils } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 p-6 z-50 bg-transparent backdrop-blur-lg">
      <div className="flex items-center justify-between">
        {/* Left-side content: Search Bar */}
        <div className="flex-grow max-w-md w-full p-3 bg-transparent rounded-md focus:outline-none placeholder-gray-400">
          
        </div>

        {/* Right-side content: Home, Restaurants, and Search buttons */}
        <ul className="flex space-x-6 font-bold text-black drop-shadow-lg">
          <li>
            <Link to="/" className="hover:text-gray-300 transition-colors duration-300">
              <FaHome className="inline-block mr-1" /> Home
            </Link>
          </li>
          <li>
            <Link to="/restaurants" className="hover:text-gray-300 transition-colors duration-300">
              <FaUtensils className="inline-block mr-1" /> Restaurants
            </Link>
          </li>
          <li>
            <Link to="/search" className="hover:text-gray-300 transition-colors duration-300">
              <FaSearch className="inline-block mr-1" /> Search
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
