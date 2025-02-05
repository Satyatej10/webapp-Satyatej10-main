const express = require("express");
const { getRestaurants } = require("../controllers/RestaurentController");

const router = express.Router();

router.get("/", getRestaurants);

module.exports = router;
