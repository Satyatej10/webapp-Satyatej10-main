import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [activeTab, setActiveTab] = useState("id");
  const [inputValue, setInputValue] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log("Active Tab:", activeTab);

    if (activeTab === "id" && inputValue) {
      console.log("Navigating to restaurant details with ID:", inputValue);
      navigate(`/restaurant/${inputValue}`);
    } else if (activeTab === "name" && inputValue) {
      console.log("Navigating to restaurant search by name:", inputValue);
      navigate(`/restaurant/name/${encodeURIComponent(inputValue)}`);

    } else if (activeTab === "location" && latitude && longitude) {
      console.log("Navigating to location search with:", { latitude, longitude, radius: 10 });
      navigate(`/location?lat=${latitude}&lng=${longitude}&radius=5`);
    } else if (activeTab === "image" && image) {
      console.log("Navigating to Image Search with image:", image.name);
      navigate(`/image-search`, { state: { image } });
    } else {
      console.warn("Invalid input. Please enter valid details.");
      alert("Please enter valid input.");
    }
  };

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toString());
          setLongitude(position.coords.longitude.toString());
          console.log("User's location:", position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("Failed to get location:", error.message);
          alert("Failed to get location: " + error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-slate-100 via-gray-200 to-stone-300">
      <div className="w-full max-w-2xl p-8 bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-white/50">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">Discover Restaurants</h2>
          <p className="text-gray-600 mt-2">Search by ID, name, location, or image.</p>
        </div>

        <div className="flex justify-center gap-3 mb-6">
          {["id", "name", "location", "image"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === tab
                  ? "bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-md"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="mb-6">
          {activeTab === "location" ? (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter Latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className="w-full p-3 border rounded-lg shadow-inner focus:ring focus:ring-gray-400 transition-all"
              />
              <input
                type="text"
                placeholder="Enter Longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                className="w-full p-3 border rounded-lg shadow-inner focus:ring focus:ring-gray-400 transition-all"
              />
            </div>
          ) : activeTab === "image" ? (
            <div className="border-2 border-dashed border-gray-400 p-6 rounded-lg text-center">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  console.log("Selected image:", e.target.files[0]?.name);
                }}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer text-gray-600 flex flex-col items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                {image ? image.name : "Upload Restaurant Image"}
              </label>
            </div>
          ) : (
            <input
              type="text"
              placeholder={`Search by ${activeTab}...`}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-inner focus:ring focus:ring-gray-400 transition-all"
            />
          )}
        </div>

        {activeTab === "location" && (
          <div className="flex gap-4">
            <button
              onClick={handleUseMyLocation}
              className="w-1/2 py-3 bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-lg shadow-md text-lg font-semibold hover:scale-105 transition-all"
            >
              Use My Location
            </button>
            <button
              onClick={handleSearch}
              className="w-1/2 py-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg shadow-md text-lg font-semibold hover:scale-105 transition-all"
            >
              Explore Restaurants →
            </button>
          </div>
        )}

        {activeTab !== "location" && (
          <button
            onClick={handleSearch}
            className="w-full py-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg shadow-md text-lg font-semibold hover:scale-105 transition-all"
          >
            Explore Restaurants →
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
