import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RestaurantCard from '../components/RestaurantCard'; // Import the RestaurantCard component

const SearchPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get query parameters from the URL
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const lat = queryParams.get('lat');
  const lng = queryParams.get('lng');
  const radius = queryParams.get('radius');

  useEffect(() => {
    if (!lat || !lng || !radius) {
      setError('Missing query parameters.');
      setLoading(false);
      return;
    }

    const fetchRestaurants = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/restaurants/location?lat=${lat}&lng=${lng}&radius=${radius}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setRestaurants(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [lat, lng, radius]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center mb-6">Nearby Restaurants</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && restaurants.length === 0 && <p>No restaurants found.</p>}

      {!loading && !error && restaurants.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {restaurants.map((item, index) => (
            <RestaurantCard key={index} restaurant={item.restaurant} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
