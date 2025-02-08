import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RestaurantCard from "../components/RestaurantCard";

const NamePage = () => {
  const params = useParams();
  const restaurantName = params.name;
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const restaurantsPerPage = 9;

  useEffect(() => {
    if (!restaurantName) {
      console.warn("No restaurant name provided in URL params");
      return;
    }

    console.log("🔍 Searching for:", restaurantName);

    const fetchRestaurants = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `https://webapp-satyatej10-main.onrender.com/restaurants/searchbyname?name=${restaurantName}`
        );

        const data = await response.json();
        console.log("API Response:", data);

        if (data.restaurants) {
          // Extract only the restaurant details from nested structure
          const extractedRestaurants = data.restaurants
            .map((item) => item?.restaurants?.restaurant)
            .filter(Boolean); // Remove null or undefined entries

          setRestaurants(extractedRestaurants);
        } else {
          console.warn("No restaurants found in API response");
        }
      } catch (error) {
        console.error("❌ Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [restaurantName]);

  // Pagination logic
  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants = restaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);

  return (
    <div className="container mx-auto p-8 pt-16 bg-gradient-to-r from-slate-100 via-gray-200 to-stone-500 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Search Results for "{restaurantName}"
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading restaurants...</p>
      ) : currentRestaurants.length === 0 ? (
        <p className="text-center text-gray-500">No restaurants found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentRestaurants.map((restaurant, index) => (
              <RestaurantCard key={index} restaurant={restaurant} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-6 space-x-4">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 text-white font-bold rounded-lg ${
                currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"
              }`}
            >
              Previous
            </button>

            <span className="text-gray-700 text-lg">Page {currentPage}</span>

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={indexOfLastRestaurant >= restaurants.length}
              className={`px-4 py-2 text-white font-bold rounded-lg ${
                indexOfLastRestaurant >= restaurants.length ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NamePage;
