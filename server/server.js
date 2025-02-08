const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const restaurantRoutes = require("./routes/Restaurentroutes");
const getRestaurantById=require("./routes/Searchroutes");
const searchRestaurantsController=require("./routes/imageRoutes");
const getRestaurantsByLocation=require("./routes/LocationRoutes");
const getRestaurantByName=require("./routes/NameRoute")
const app = express();
const cors=require("cors");
app.use(cors());

dotenv.config();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/restaurants", searchRestaurantsController);
app.use("/restaurants", getRestaurantByName);

app.use("/restaurants",getRestaurantsByLocation);
app.use("/restaurants",getRestaurantById)
app.use("/restaurants", restaurantRoutes);
app.listen(port, async () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
    await connectDB();
});
