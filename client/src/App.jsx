import React from "react";
import { BrowserRouter as Router, Routes,Route  } from "react-router-dom";
import LocationSearch from "./pages/LocationSearch";
import SearchPage from "./pages/SearchPage";
import RestaurantList from "./pages/RestaurantList";
import RestaurantDetail from "./pages/RestaurantDetail";
import LocationQuery from "./pages/Search"
import Navbar from "./components/Navbar";
import ImageSearch from "./pages/Image-search"
function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div >
          <Routes>
            <Route path="/" element={<LocationSearch/>} />
            <Route path="/image-search" element={<ImageSearch/>} />
            <Route path="/search" element={<LocationQuery/>} />
            <Route path="/location" element={<SearchPage/>} />
            <Route path="/restaurants" element={<RestaurantList/>} />
            <Route path="/restaurant/:id" element={<RestaurantDetail/>} />
          </Routes>
        </div>
      </div>
      
    </Router>
  );
}

export default App;
