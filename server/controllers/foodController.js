const uploadAndFindRestaurants = async (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No image uploaded" });

    try {
        const foodDetectionResult = await detectFood(req.file.buffer);
        
        if (!foodDetectionResult || !Array.isArray(foodDetectionResult) || foodDetectionResult.length === 0) {
            return res.status(500).json({ error: "Food detection failed" });
        }
        
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
            return res.json({ message: "No cuisines identified", restaurants: [] });
        }
        
        console.log("Identified Cuisines:", topCuisines);
        const db = await connectDB();
        const collection = db.collection("Restaurents");

        const result = await collection
            .find({ "restaurants.restaurant.cuisines": { $in: topCuisines } })
            .toArray();
        
        let filteredRestaurants = result.flatMap(doc =>
            doc.restaurants.filter(r => topCuisines.some(c => r.restaurant.cuisines.includes(c))) // Match cuisines
        );

        // ✅ Ensure `user_rating` always exists
        filteredRestaurants = filteredRestaurants.map(r => ({
            ...r.restaurant,
            user_rating: r.restaurant.user_rating || { aggregate_rating: "N/A", votes: 0 } // Default if missing
        }));

        if (filteredRestaurants.length === 0) {
            return res.json({ message: "No matching restaurants found", restaurants: [] });
        }

        res.json({ restaurants: filteredRestaurants });
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
