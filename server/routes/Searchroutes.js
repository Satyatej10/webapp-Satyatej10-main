const express = require("express");
const { getRestaurantById } = require("../controllers/SearchController");

const router = express.Router();

router.get("/:id", getRestaurantById);

module.exports = router;
