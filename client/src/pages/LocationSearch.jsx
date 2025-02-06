import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLocationArrow, FaMapMarkerAlt, FaRulerCombined, FaSearch } from 'react-icons/fa';

const LocationSearch = () => {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [radius, setRadius] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (lat && lng && radius) {
      navigate(`/search?lat=${lat}&lng=${lng}&radius=${radius}`);
    } else {
      alert('Please provide valid latitude, longitude, and radius');
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-r from-slate-100 via-gray-200 to-stone-300">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')` }}
      ></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
              <img 
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
                alt="Restaurant 1" 
                className="rounded-lg shadow-2xl w-full h-64 object-cover sm:block hidden"
              />
              <img 
                src="https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
                alt="Restaurant 2" 
                className="rounded-lg shadow-2xl w-full h-64 object-cover sm:block hidden"
              />
              <img 
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
                alt="Restaurant 3" 
                className="rounded-lg shadow-2xl w-full h-64 object-cover sm:block hidden"
              />
              <img 
                src="https://plus.unsplash.com/premium_photo-1661953124283-76d0a8436b87?q=80&w=1788&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Restaurant 4" 
                className="rounded-lg shadow-2xl w-full h-64 object-cover sm:block hidden"
              />
            </div>
          </div>

          <div className="col-span-1 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-black mb-4">Discover the Best Restaurants Near You</h1>
            <p className="text-black mb-8">Explore top-rated restaurants, cafes, and bars in your area. Find the perfect spot for any occasion.</p>
            <div className="space-y-4">
              <button
                onClick={() => navigate('/restaurants')}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center"
              >
                <FaSearch className="inline-block mr-2" />
                View Restaurants
              </button>
              <button
                onClick={() => navigate('/search')}
                className="w-full py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 transition-all duration-300 flex items-center justify-center"
              >
              <FaMapMarkerAlt className="inline-block mr-2" />
                Search Restaurents
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSearch;
