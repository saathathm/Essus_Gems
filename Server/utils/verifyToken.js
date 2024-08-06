import jwt from "jsonwebtoken";
import { createError } from "./error.js";
import Gem from "../models/Gem.js";
import mongoose from "mongoose";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You're not authenticated!"));
  }

  jwt.verify(token, process.env.JWT, (error, user) => {
    if (error) {
      return next(createError(403, "Token is not valid!"));
    }
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, (err) => {
    if (err) return next(err);
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You're not authorized!"));
    }
  });
};

export const verifyGemUser = (req, res, next) => {
  verifyToken(req, res, async (err) => {
    if (err) return next(err);

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, "Invalid Gem ID"));
    }

    try {
      const gem = await Gem.findById(id);
      if (!gem) {
        return next(createError(404, "Gem not found!"));
      }
      if (gem.addedBy.toString() === req.user.id || req.user.isAdmin) {
        next();
      } else {
        return next(createError(403, "You're not authorized!"));
      }
    } catch (error) {
      return next(error);
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, (err) => {
    if (err) return next(err);
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You're not authorized!"));
    }
  });
};
