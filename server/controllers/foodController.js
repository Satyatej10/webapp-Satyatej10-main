const connectDB = require("../config/db");
const axios = require("axios");
const multer = require("multer");
const HF_API_KEY = process.env.HF_API_KEY;

const storage = multer.memoryStorage();
const upload = multer({ storage });

const detectFood = async (imageBuffer) => {
    try {
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

        return response.data;
    } catch (error) {
        console.error("Error from API:", error.response ? error.response.data : error.message);
        return null;
    }
};
const uploadAndFindRestaurants = async (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No image uploaded" });

    try {
        const foodDetectionResult = await detectFood(req.file.buffer);
        
        if (!foodDetectionResult || !Array.isArray(foodDetectionResult) || foodDetectionResult.length === 0) {
            return res.status(500).json({ error: "Food detection failed" });
        }
        
        const foodToCuisineMap = {
            "Grilled Chicken": "Continental",
            "Roast Beef": "Continental",
            "Mashed Potatoes": "Continental",
            "Baked Fish": "Continental",
            "Garlic Bread": "Continental",
            "French Toast": "Continental",
            
            "Butter Chicken": "North Indian",
            "Dal Makhani": "North Indian",
            "Paneer Tikka": "North Indian",
            "Rogan Josh": "North Indian",
            "Aloo Paratha": "North Indian",
            "Chole Bhature": "North Indian",
            
            "Pizza": "Italian",
            "Pasta": "Italian",
            "Lasagna": "Italian",
            "Risotto": "Italian",
            "Tiramisu": "Italian",
            "Bruschetta": "Italian",
            
            "Sushi": "Asian",
            "Ramen": "Asian",
            "Dumplings": "Asian",
            "Kimchi": "Asian",
            "Pad Thai": "Asian",
            "Pho": "Asian",
            
            "Burgers": "American",
            "Hot Dogs": "American",
            "BBQ Ribs": "American",
            "Mac and Cheese": "American",
            "Fried Chicken": "American",
            "Apple Pie": "American",
            
            "Fried Rice": "Chinese",
            "Manchurian": "Chinese",
            "Spring Rolls": "Chinese",
            "Chow Mein": "Chinese",
            "Kung Pao Chicken": "Chinese",
            "Dumplings": "Chinese",
            
            "Truffle Risotto": "Fine Dining",
            "Foie Gras": "Fine Dining",
            "Wagyu Steak": "Fine Dining",
            "Caviar": "Fine Dining",
            "Lobster Thermidor": "Fine Dining",
            "Beef Wellington": "Fine Dining",
            
            "Tacos": "Mexican",
            "Burritos": "Mexican",
            "Nachos": "Mexican",
            "Quesadillas": "Mexican",
            "Enchiladas": "Mexican",
            "Guacamole": "Mexican",
            
            "Hummus": "Mediterranean",
            "Falafel": "Mediterranean",
            "Shawarma": "Mediterranean",
            "Greek Salad": "Mediterranean",
            "Moussaka": "Mediterranean",
            "Baba Ganoush": "Mediterranean",
            
            "Butter Chicken Tacos": "Modern Indian",
            "Quinoa Biryani": "Modern Indian",
            "Tandoori Broccoli": "Modern Indian",
            "Avocado Chaat": "Modern Indian",
            "Mango Curry": "Modern Indian",
            
            "Biryani": "Mughlai",
            "Shahi Paneer": "Mughlai",
            "Korma": "Mughlai",
            "Kebabs": "Mughlai",
            "Nihari": "Mughlai",
            "Sheermal": "Mughlai",
            
            "French Fries": "Fast Food",
            "Burgers": "Fast Food",
            "Chicken Nuggets": "Fast Food",
            "Hot Dogs": "Fast Food",
            "Sandwiches": "Fast Food",
            "Milkshakes": "Fast Food",
            
            "Dosa": "South Indian",
            "Idli": "South Indian",
            "Vada": "South Indian",
            "Uttapam": "South Indian",
            "Rasam": "South Indian",
            "Pongal": "South Indian",
            
            "Croissants": "European",
            "Paella": "European",
            "Goulash": "European",
            "Fish and Chips": "European",
            "Ratatouille": "European",
            "Beef Stroganoff": "European"
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

module.exports = { uploadAndFindRestaurants, upload };
