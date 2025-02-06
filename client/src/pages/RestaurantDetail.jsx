
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await fetch(`https://webapp-satyatej10-main.onrender.com/restaurants/${id}`);
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
    <div className="bg-gradient-to-r from-slate-100 via-gray-200 to-stone-300 min-h-screen py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-10 p-5">
        
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

                   <div className="mt-4 space-y-2 text-gray-800">
     <p><b>Cuisine:</b> {restaurant.cuisines || "N/A"}</p>
                   <p><b>Address:</b> {restaurant.location?.address || "N/A"}</p>
               <p><b>Average Cost for Two:</b> ₹{restaurant.average_cost_for_two || "N/A"}</p>
               <p><b>Online Delivery:</b> {restaurant.has_online_delivery ? "Available" : "Not Available"}</p>
               <p><b>Table Booking:</b> {restaurant.has_table_booking ? "Available" : "Not Available"}</p>
               <p><b>Price Range:</b> {restaurant.price_range || "N/A"}</p>
               <p><b>Rating:</b> {restaurant.user_rating?.rating_text || "N/A"} ({restaurant.user_rating?.votes} votes)</p>
               <p><b>Phone:</b> {restaurant.phone_numbers || "Not available"}</p>
             </div>
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

      {/* Menu and Events Section */}
       <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 pl-4 pr-4">
           {/* Menu Section */}
           {restaurant.menu_url && (
             <div className="p-6 bg-gray-50 rounded-lg shadow-md transition hover:shadow-lg">
               <h2 className="text-2xl font-semibold text-gray-800 mb-4">🍽️ Menu</h2>
               <a
                 href={restaurant.menu_url}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-blue-600 font-semibold hover:underline"
               >
                 Click here to view menu
               </a>
             </div>
           )}

           {/* Events Section */}
           {restaurant.events_url && (
             <div className="p-6 bg-gray-50 rounded-lg shadow-md transition hover:shadow-lg">
               <h2 className="text-2xl font-semibold text-gray-800 mb-4">🎉 Events</h2>
               <a
                 href={restaurant.events_url}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-blue-600 font-semibold hover:underline"
               >
                 Check Upcoming Events
               </a>
             </div>
           )}
         </div>
    </div>
  );
};

export default RestaurantDetails;