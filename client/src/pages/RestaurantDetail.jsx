import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await fetch(`http://localhost:5000/restaurants/${id}`);
        const data = await response.json();
        console.log("Fetched Restaurant Data:", data);
        setRestaurant(data);
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
      }
      setLoading(false);
    };

    fetchRestaurant();
  }, [id]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (!restaurant) return <p className="text-center text-red-500">Restaurant not found.</p>;

  return (
    <div className="w-full p-6 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-lg shadow-lg">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* Left Section - Image & Rating */}
        <div className="relative">
          <img
            src={restaurant.featured_image || "https://via.placeholder.com/600"}
            alt={restaurant.name}
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />
          <div className="absolute top-4 left-4 bg-black text-white px-4 py-2 rounded-lg text-lg font-semibold">
            ⭐ {restaurant.user_rating?.aggregate_rating || "N/A"}
          </div>
        </div>

        {/* Right Section - Details */}
        <div>
          <h1 className="text-4xl font-bold text-biscuit-900">{restaurant.name}</h1>
          <p className="text-buscuit-600 text-lg mt-2">{restaurant.location?.locality || "Location not available"}</p>

          {/* Cuisines */}
          <p className="mt-4 text-white-200 text-lg"><b>Cuisine:</b> {restaurant.cuisines || "N/A"}</p>

          {/* Address */}
          <p className="mt-2"><b>Address:</b> {restaurant.location?.address || "N/A"}</p>

          {/* Pricing & Cost */}
          <p className="mt-2"><b>Average Cost for Two:</b> ₹{restaurant.average_cost_for_two || "N/A"}</p>

          {/* Contact */}
          <p className="mt-2"><b>Phone:</b> {restaurant.phone_numbers || "Not available"}</p>

          {/* Visit Website Button */}
          {restaurant.url && (
            <a
              href={restaurant.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block px-6 py-3 rounded-lg hover:bg-balck-1000 transition text-center"
            >
              Visit Website
            </a>
          )}
        </div>

      </div>

      {/* Menu Section */}
      {restaurant.menu_url && (
        <div className="mt-10 p-6 bg-beige-100 rounded-lg">
          <h2 className="text-3xl font-semibold text-buscuit-1000 mb-4">Menu</h2>
          <a
            href={restaurant.menu_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Click here to view menu 🍽️
          </a>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetails;
