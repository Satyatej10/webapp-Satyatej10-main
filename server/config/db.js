const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI;
let db;

const connectDB = async () => {
    if (db) return db;
    const client = new MongoClient(uri);
    await client.connect();
    console.log("✅ MongoDB Connected");
    db = client.db("RestaurentList"); // Replace with actual DB name
    return db;
};

module.exports = connectDB;
