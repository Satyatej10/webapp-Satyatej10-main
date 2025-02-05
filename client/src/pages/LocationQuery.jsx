import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLocationArrow, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';

const LocationSearch = () => {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [radius, setRadius] = useState("3");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (lat && lng) {
      navigate(`/search?lat=${lat}&lng=${lng}&radius=${radius}`);
    } else if(!lat || !lng){
      alert('Please provide valid latitude, longitude, and radius');
    }
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLat = position.coords.latitude;
          const currentLng = position.coords.longitude;
          setLat(currentLat);
          setLng(currentLng);
          setRadius(3); // Default radius to 3 km
        },
        (error) => {
          console.error('Error getting geolocation:', error);
          alert('Failed to get your location. Please enable location services.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-10 transform transition-all hover:scale-105">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 ">
            Find Restaurants Near You
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Latitude Input */}
            <div className="space-y-2">
              <label htmlFor="lat" className="text-gray-700 font-medium">
                Latitude
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg p-3 hover:border-blue-500 transition-all">
                <FaLocationArrow className="text-gray-500 mr-2" />
                <input
                  id="lat"
                  type="text"
                  className="w-full p-2 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                  required
                  placeholder="Enter Latitude"
                />
              </div>
            </div>

            {/* Longitude Input */}
            <div className="space-y-2">
              <label htmlFor="lng" className="text-gray-700 font-medium">
                Longitude
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg p-3 hover:border-blue-500 transition-all">
                <FaMapMarkerAlt className="text-gray-500 mr-2" />
                <input
                  id="lng"
                  type="text"
                  className="w-full p-2 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={lng}
                  onChange={(e) => setLng(e.target.value)}
                  required
                  placeholder="Enter Longitude"
                />
              </div>
            </div>

            {/* Use Current Location Button */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                className="w-full py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 transition-all duration-300 flex items-center justify-center"
              >
                <FaLocationArrow className="inline-block mr-2" />
                Use My Current Location
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center"
            >
              <FaSearch className="inline-block mr-2" />
              View Restaurants
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LocationSearch;
