import Location from "../models/Location.js";
import allLocation from "../data/allLocation.json" assert { type: "json" };
import dotenv from "dotenv";
import connectDB from "../config/db.js";

dotenv.config({ path: "config/config.env" });
connectDB();

const seedLocation = async () => {
  try {
    await Location.deleteMany();
    console.log("Location deleted!");
    await Location.insertMany(allLocation);
    console.log("All location added!");
  } catch (error) {
    console.log(error.message);
  }
  process.exit();
};

seedLocation();
