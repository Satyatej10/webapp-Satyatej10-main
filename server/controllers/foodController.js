let collection;
const { query } = require("express");
const connectDB = require("../config/db");

async function searchRestaurantsByName(req, res) {
    try {
        const db = await connectDB();
        collection = db.collection("Restaurents");
        if (!collection) {
            return res.status(500).json({ message: "NO Database" });
        }

        const { search } = req.query; // Get search term from query
        if (!search) {
            return res.status(400).json({ message: "Search term is required" });
        }

        // MongoDB regex query to match names starting with the search term (case-insensitive)
        const regex = new RegExp(`^${search}`, "i");

        const documents = await collection.find({ "restaurants.restaurant.name": regex }).toArray();

        if (!documents.length) {
            return res.status(404).json({ message: "No matching restaurants found" });
        }

        // Extracting matching restaurant names
        const matchedRestaurants = documents.flatMap(doc =>
            doc.restaurants
                .filter(r => regex.test(r.restaurant.name))
                .map(r => r.restaurant.name)
        );

        res.json({ restaurants: search });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { searchRestaurantsByName };
