import React, { useState } from "react";
import { FaHome, FaSearch, FaUtensils, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 p-4 z-50 bg-white/30 backdrop-blur-lg shadow-md">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        
        <button
          className="md:hidden text-black focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        <ul className="hidden md:flex space-x-6 font-bold text-black ml-auto">
          <li>
            <Link to="/" className="hover:text-gray-700 transition duration-300">
              <FaHome className="inline-block mr-1" /> Home
            </Link>
          </li>
          <li>
            <Link to="/restaurants" className="hover:text-gray-700 transition duration-300">
              <FaUtensils className="inline-block mr-1" /> Restaurants
            </Link>
          </li>
          <li>
            <Link to="/search" className="hover:text-gray-700 transition duration-300">
              <FaSearch className="inline-block mr-1" /> Search
            </Link>
          </li>
        </ul>
      </div>

      {menuOpen && (
        <ul className="md:hidden flex flex-col space-y-4 bg-stone-100 backdrop-blur-lg absolute top-16 left-0 w-full p-4 shadow-lg z-40">
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)} className="block text-black text-lg">
              <FaHome className="inline-block mr-2" /> Home
            </Link>
          </li>
          <li>
            <Link to="/restaurant" onClick={() => setMenuOpen(false)} className="block text-black text-lg">
              <FaUtensils className="inline-block mr-2" /> Restaurants
            </Link>
          </li>
          <li>
            <Link to="/search" onClick={() => setMenuOpen(false)} className="block text-black text-lg">
              <FaSearch className="inline-block mr-2" /> Search
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
