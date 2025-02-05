const connectDB = require("../config/db");
let collection;
const getRestaurants = async (req, res) => {
    try {
        const db = await connectDB();
        collection = db.collection("Restaurents");
        const page = parseInt(req.query.page) || 1;
        const pageSize = 12;
        const skip = (page - 1) * pageSize;

        const result = await collection.aggregate([
            { $unwind: "$restaurants" },
            { $replaceRoot: { newRoot: "$restaurants" } },
            { $skip: skip },
            { $limit: pageSize }
        ]).toArray();
        const countResult = await collection.aggregate([
            { $unwind: "$restaurants" },
            { $count: "total" }
        ]).toArray();
        const totalRestaurants = countResult.length > 0 ? countResult[0].total : 0;
        const totalPages = Math.ceil(totalRestaurants / pageSize);

        res.json({ page, pageSize, totalPages, totalRestaurants, restaurants: result });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports = { getRestaurants };
