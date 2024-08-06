import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import {
  addToWatchList,
  getWatchList,
  removeFromWatchList,
} from "../controllers/watchListController.js";
const router = express.Router();

router.post("/:id", verifyToken, addToWatchList);

router.delete("/:id", verifyToken, removeFromWatchList);

router.get("/", verifyToken, getWatchList);

export default router;
