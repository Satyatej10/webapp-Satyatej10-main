import React from "react";
import { BrowserRouter as Router, Routes,Route  } from "react-router-dom";
import LocationSearch from "./pages/LocationSearch";
import SearchPage from "./pages/SearchPage";
import RestaurantList from "./pages/RestaurantList";
import RestaurantDetail from "./pages/RestaurantDetail";
import LocationQuery from "./pages/Search"
import Navbar from "./components/Navbar";
import ImageSearch from "./pages/Image-search"
import NamePage from "./pages/NamePage"
function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div >
          <Routes>
            <Route path="/restaurant/name/:name" element={<NamePage />} />
            <Route path="/" element={<LocationSearch/>} />
            <Route path="/image-search" element={<ImageSearch/>} />
            <Route path="/search" element={<LocationQuery/>} />
            <Route path="/location" element={<SearchPage/>} />
            <Route path="/restaurant" element={<RestaurantList/>} />
            <Route path="/restaurant/:id" element={<RestaurantDetail/>} />
          </Routes>
        </div>
      </div>
      
    </Router>
  );
}

export default App;
