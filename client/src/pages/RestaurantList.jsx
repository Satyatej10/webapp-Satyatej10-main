import { useState, useEffect } from "react";
import RestaurantCard from "../components/RestaurantCard";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://webapp-satyatej10-main.onrender.com/restaurants?page=1${page}`);
        const data = await response.json();
        console.log(data); // Check the data received from the API
        setRestaurants(data.restaurants || []); // Adjust according to your API structure
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
      setLoading(false);
    };

    fetchRestaurants();
  }, [page]);

  return (
    <div className="w-full p-6 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8 drop-shadow-lg">
        Discover Top Restaurants
      </h1>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin h-12 w-12 border-t-4 border-blue-600 border-solid rounded-full"></div>
          <p className="ml-4 text-xl font-semibold text-gray-700">Loading...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.restaurant.id} restaurant={restaurant.restaurant} />
          ))}
        </div>
      )}

      <div className="flex justify-center items-center mt-8 space-x-6">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className={`px-6 py-3 rounded-lg text-lg font-semibold transition-colors duration-300 ${
            page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Previous
        </button>
        <span className="text-lg font-semibold text-gray-800">Page {page}</span>
        <button
          onClick={() => setPage(page + 1)}
          className="px-6 py-3 rounded-lg text-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RestaurantList;
