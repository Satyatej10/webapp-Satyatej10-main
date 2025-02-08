const connectDB = require("../config/db");
const axios = require("axios");
const multer = require("multer");
const HF_API_KEY = process.env.HF_API_KEY;

const storage = multer.memoryStorage();
const upload = multer({ storage });

const detectFood = async (imageBuffer) => {
    try {
        console.log("Sending request to Hugging Face API for food detection...");
        const response = await axios.post(
            "https://api-inference.huggingface.co/models/ewanlong/food_type_image_detection",
            imageBuffer,
            {
                headers: {
                    Authorization: `Bearer ${HF_API_KEY}`,
                    "Content-Type": "application/octet-stream",
                },
            }
        );

        console.log("Food detection response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error from API:", error.response ? error.response.data : error.message);
        return null;
    }
};

const uploadAndFindRestaurants = async (req, res) => {
    console.log("Received request to upload image and find restaurants...");
    
    if (!req.file) {
        console.error("No image uploaded");
        return res.status(400).json({ error: "No image uploaded" });
    }

    try {
        console.log("Image uploaded, starting food detection...");
        const foodDetectionResult = await detectFood(req.file.buffer);

        if (!foodDetectionResult || !Array.isArray(foodDetectionResult) || foodDetectionResult.length === 0) {
            console.error("Food detection failed or returned empty results");
            return res.status(500).json({ error: "Food detection failed" });
        }

        console.log("Food Detection Result:", foodDetectionResult);

        const foodToCuisineMap = {
            burger: "American",
            pizza: "Italian",
            sushi: "Japanese",
            biryani: "Indian",
            tacos: "Mexican",
            pasta: "Italian",
            cheesecake: "Dessert",
            "baked potato": "American",
            "crispy chicken": "Fast Food",
            chai: "Indian"
        };

        const topCuisines = foodDetectionResult
            .sort((a, b) => b.score - a.score)
            .slice(0, 2)
            .map(item => foodToCuisineMap[item.label.toLowerCase()] || null) 
            .filter(Boolean);

        if (topCuisines.length === 0) {
            console.log("No cuisines identified from the food detection results.");
            return res.json({ message: "No cuisines identified", restaurants: [] });
        }

        console.log("Identified Cuisines:", topCuisines);

        const db = await connectDB();
        const collection = db.collection("Restaurents");

        console.log("Searching for restaurants matching the cuisines...");
        const result = await collection
            .find({ "restaurants.restaurant.cuisines": { $in: topCuisines } })
            .toArray();

        console.log("Found restaurants:", result);

        const filteredRestaurants = result.flatMap(doc =>
            doc.restaurants
                .filter(r => topCuisines.some(c => r.restaurant.cuisines.includes(c)))
                .map(r => ({
                    name: r.restaurant.name,
                    location: r.restaurant.location,
                    cuisines: r.restaurant.cuisines,
                    user_rating: r.restaurant.user_rating,
                    price_range: r.restaurant.price_range,
                    featured_image: r.restaurant.featured_image,
                    menu_url: r.restaurant.menu_url,
                    url: r.restaurant.url
                }))
        );

        if (filteredRestaurants.length === 0) {
            console.log("No matching restaurants found.");
            return res.json({ message: "No matching restaurants found", restaurants: [] });
        }

        console.log("Returning matching restaurants:", filteredRestaurants);
        res.json({ restaurants: filteredRestaurants });
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { uploadAndFindRestaurants, upload };
