import Gem from "../models/Gem.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createError } from "../utils/error.js";

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Gem
export const createGem = async (req, res, next) => {
  try {
    let medias = [];
    let BASE_URL = process.env.BACKEND_URL;

    if (req.files.length > 0) {
      req.files.forEach((file) => {
        let url = `${BASE_URL}/uploads/product/${file.filename}`;
        medias.push({ media: url });
      });
    }

    req.body.medias = medias;
    req.body.addedBy = req.user.id;
    const { city, area, ...otherDatas } = req.body;
    const gem = await Gem.create({ location: { city, area }, ...otherDatas });
    res.status(201).json({
      success: true,
      gem,
    });
  } catch (error) {
    next(error);
  }
};

// Update Gem
export const updateGem = async (req, res, next) => {
  try {
    const gemId = req.params.id;
    const gem = await Gem.findById(gemId);

    let BASE_URL = process.env.BACKEND_URL;
    let medias = gem.medias; // Existing medias

    // Handle media removal
    if (req.body.removeMedias) {
      const removeMedias = JSON.parse(req.body.removeMedias);
      medias = medias.filter((media) => !removeMedias.includes(media.media));
      removeMedias.forEach((mediaUrl) => {
        const filePath = path.join(
          __dirname,
          "..",
          "uploads/product",
          path.basename(mediaUrl)
        );
        fs.unlink(filePath, (err) => {
          if (err) console.error(`Failed to delete file: ${filePath}`, err);
        });
      });
    }

    // Handle new media files
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        let url = `${BASE_URL}/uploads/product/${file.filename}`;
        medias.push({ media: url });
      });
    }
    if (req.body.area) {
      req.body.location = { city: req.body.city, area: req.body.area };
    }

    // Update gem details
    const updatedGem = await Gem.findByIdAndUpdate(
      gemId,
      {
        ...req.body,
        medias,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      gem: updatedGem,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Gem
export const deleteGem = async (req, res, next) => {
  try {
    const gemId = req.params.id;
    const gem = await Gem.findById(gemId);

    if (!gem) {
      return res.status(404).json({ success: false, message: "Gem not found" });
    }

    let medias = gem.medias; // Existing medias

    // Remove Media
    if (medias) {
      medias.forEach((media) => {
        const filePath = path.join(
          __dirname,
          "..",
          "uploads/product",
          path.basename(media.media)
        );
        fs.unlink(filePath, (err) => {
          if (err) console.error(`Failed to delete file: ${filePath}`, err);
        });
      });
    }

    await Gem.findByIdAndDelete(gemId);
    res.status(200).json("Item has been deleted");
  } catch (error) {
    next(error);
  }
};

// Get All
export const getAllGem = async (req, res, next) => {
  try {
    const gems = await Gem.find();
    res.status(200).json({ status: 200, gems });
  } catch (error) {
    next(error);
  }
};

// Get By Id
export const getGem = async (req, res, next) => {
  try {
    const gemId = req.params.id;
    const gem = await Gem.findById(gemId);
    res.status(200).json({ status: 200, gem });
  } catch (error) {
    next(error);
  }
};
