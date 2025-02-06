import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLocationArrow, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';

const LocationSearch = () => {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [radius, setRadius] = useState("10");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (lat && lng) {
      navigate(`/location?lat=${lat}&lng=${lng}&radius=${radius}`);
    } else {
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
          setRadius(5);
          navigate(`/location?lat=${currentLat}&lng=${currentLng}&radius=${radius}`);
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
    <div className="min-h-screen bg-gradient-to-r from-slate-100 via-gray-200 to-stone-300 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 transform transition-all hover:scale-105">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Find Restaurants Near You</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="lat" className="text-gray-700 font-medium">Latitude</label>
            <div className="flex items-center border border-gray-300 rounded-lg p-3 focus-within:border-blue-500">
              <FaLocationArrow className="text-gray-500 mr-2" />
              <input
                id="lat"
                type="text"
                className="w-full p-2 border-none rounded-lg focus:outline-none"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                required
                placeholder="Enter Latitude"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="lng" className="text-gray-700 font-medium">Longitude</label>
            <div className="flex items-center border border-gray-300 rounded-lg p-3 focus-within:border-blue-500">
              <FaMapMarkerAlt className="text-gray-500 mr-2" />
              <input
                id="lng"
                type="text"
                className="w-full p-2 border-none rounded-lg focus:outline-none"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                required
                placeholder="Enter Longitude"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleUseCurrentLocation}
            className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center font-bold shadow-md"
          >
            <FaLocationArrow className="inline-block mr-2" />
            Use My Current Location
          </button>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 flex items-center justify-center font-bold shadow-md"
          >
            <FaSearch className="inline-block mr-2" />
            View Restaurants
          </button>
        </form>
      </div>
    </div>
  );
};

export default LocationSearch;
