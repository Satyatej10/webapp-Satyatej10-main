const express = require("express");
const router = express.Router();
const { getRestaurantByName } = require("../controllers/NameController"); // Import controller

// Define route for searching restaurants
router.get("/search", getRestaurantByName);

module.exports = router;
