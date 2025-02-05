const express = require("express");
const router = express.Router();
const connectDB = require("../config/db");

let collection;

(async () => {
    const db = await connectDB();
    collection = db.collection("Restaurents");
})();

// 🔹 Search by Restaurant Name
router.get("/name/:name", async (req, res) => {
    try {
        if (!collection) {
            return res.status(500).json({ message: "Database not initialized yet" });
        }

        const { name } = req.params;

        // Restaurant name ni lowercase compare cheyyataniki
        const document = await collection.findOne({
            "restaurants.restaurant.name": { $regex: new RegExp(name, "i") }
        });

        if (!document) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        // Correct restaurant filter cheyyadam
        const restaurant = document.restaurants.find(r => r.restaurant.name.toLowerCase() === name.toLowerCase());

        res.json(restaurant ? restaurant.restaurant : { message: "Restaurant not found" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
