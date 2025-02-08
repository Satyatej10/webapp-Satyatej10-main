const express = require("express");
const { uploadAndFindRestaurants, upload } = require("../controllers/foodController");

const router = express.Router();

// Single route to handle image upload, food detection, cuisine identification, and restaurant search
router.post("/image-search", upload.single("image"), uploadAndFindRestaurants);

module.exports = router;
