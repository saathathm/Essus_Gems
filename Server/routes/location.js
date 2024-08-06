import express from "express";
import {
  createLocation,
  deleteLocation,
  getLocationById,
  getLocations,
  updateLocation,
} from "../controllers/locationController.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

// create location
router.post("/", createLocation);

// get all location
router.get("/", getLocations);

// get location by id
router.get("/find/:id", getLocationById);

// update location
router.put("/", verifyAdmin, updateLocation);

// delete location
router.delete("/", verifyAdmin, deleteLocation);

export default router;
