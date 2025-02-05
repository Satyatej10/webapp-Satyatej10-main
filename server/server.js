const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const restaurantRoutes = require("./routes/Restaurentroutes");
const getRestaurantById=require("./routes/Searchroutes");
const app = express();
const cors=require("cors");
app.use(cors());

const getRestaurantsByLocation=require("./routes/LocationRoutes");
dotenv.config();
const port = process.env.PORT || 5000;

app.use(express.json());
const Searchroutes = require("./routes/Foodroutes");

app.use("/restaurants", Searchroutes);

app.use("/restaurants",getRestaurantsByLocation);
app.use("/restaurants",getRestaurantById)
app.use("/restaurants", restaurantRoutes);
app.listen(port, async () => {
    
    console.log(`🚀 Server running on http://localhost:${port}`);
    await connectDB();
});
