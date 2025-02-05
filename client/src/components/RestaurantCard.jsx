import React from 'react';
import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl max-w-full">
      <img
        src={restaurant.featured_image}
        alt={restaurant.name}
        className="w-full h-72 object-cover"
      />
      <div className="p-4">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">{restaurant.name}</h3>
        <p className="text-md text-gray-600">{restaurant.cuisines}</p>
        <div className="flex items-center mt-3">
          <span className="text-green-500 font-bold text-lg">
            {restaurant.user_rating.aggregate_rating}
          </span>
          <span className="text-gray-500 ml-2 text-md">
            ({restaurant.user_rating.votes} votes)
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-3">{restaurant.location.address}</p>
        <Link
          to={`/restaurant/${restaurant.id}`}
          className="mt-4 inline-block text-blue-600 hover:text-blue-800 text-sm font-semibold"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default RestaurantCard;
