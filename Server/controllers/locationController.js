import Location from "../models/Location.js";
import { createError } from "../utils/error.js";

export const createLocation = async (req, res, next) => {
  try {
    const { city, areas } = req.body;
    const location = new Location({ city, areas });
    await location.save();
    res.status(201).json({ status: 201, location });
  } catch (error) {
    next(error);
  }
};

export const getLocations = async (req, res, next) => {
  try {
    const locations = await Location.find();
    res.status(200).json({ status: 200, locations });
  } catch (error) {
    next(error);
  }
};

export const getLocationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const location = await Location.findById(id);
    if (!location) {
      return next(createError(404, "Location not found!"));
    }
    res.status(200).json({ status: 200, location });
  } catch (error) {
    next(error);
  }
};

export const updateLocation = async (req, res, next) => {
  try {
    const { city, areas } = req.body;
    const location = await Location.findByIdAndUpdate(
      req.params.id,
      { city, areas },
      { new: true }
    );
    if (!location) {
      return next(createError(404, "Location not found!"));
    }
    res.status(200).json({ status: 200, location });
  } catch (error) {
    next(error);
  }
};

export const deleteLocation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const location = await Location.findByIdAndDelete(id);
    if (!location) {
      return next(createError(404, "Location not found!"));
    }
    res.status(200).json({ message: "Location deleted!" });
  } catch (error) {
    next(error);
  }
};
