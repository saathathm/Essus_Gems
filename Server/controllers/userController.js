import User from "../models/User.js";
import { createError } from "../utils/error.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return next(createError(404, "User not found!"));
    }
    let avatar;

    let BASE_URL = process.env.BACKEND_URL;

    if (req.file) {
      if (user.avatar) {
        const filePath = path.join(
          __dirname,
          "..",
          "uploads/user",
          path.basename(user.avatar)
        );
        fs.unlink(filePath, (err) => {
          if (err) console.error(`Failed to delete file: ${filePath}`, err);
        });
      }
      avatar = `${BASE_URL}/uploads/user/${req.file.filename}`;
      req.body.avatar = avatar;
    }

    if (req.body.password) {
      const salt = bcrypt.genSaltSync(10);
      req.body.password = bcrypt.hashSync(req.body.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    );

    const { isAdmin, password, ...others } = updatedUser._doc;

    res.status(200).json({ status: 200, ...others });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return next(createError(404, "User not found!"));
    }

    let avatar = user.avatar;

    // Remove Media
    if (avatar) {
      const filePath = path.join(
        __dirname,
        "..",
        "uploads/product",
        path.basename(avatar)
      );
      fs.unlink(filePath, (err) => {
        if (err) console.error(`Failed to delete file: ${filePath}`, err);
      });
    }

    await User.findByIdAndDelete(userId);
    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};

// Get All
export const getAll = async (req, res, next) => {
  try {
    const users = await User.find().select("-password -isAdmin");

    res.status(200).json({ status: 200, users });
  } catch (error) {
    next(error);
  }
};

// Get By Id
export const getById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select("-password -isAdmin");
    const { isAdmin, password, ...others } = user._doc;

    res.status(200).json({ status: 200, ...others });
  } catch (error) {}
};
