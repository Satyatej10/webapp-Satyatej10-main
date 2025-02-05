const express = require("express");
const { getRestaurantsByLocation } = require("../controllers/LocationController");

const router = express.Router();

router.get("/location", getRestaurantsByLocation);  

module.exports = router;
