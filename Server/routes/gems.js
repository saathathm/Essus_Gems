import express from "express";
import {
  createGem,
  deleteGem,
  getAllGem,
  getGem,
  updateGem,
} from "../controllers/gemController.js";
const router = express.Router();
import { verifyGemUser, verifyToken } from "../utils/verifyToken.js";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "..", "uploads/product"));
    },
    filename: function (req, file, cb) {
      const fileExtension = path.extname(file.originalname);
      cb(null, Date.now() + fileExtension);
    },
  }),
});

// Create
router.post("/add", verifyToken, upload.array("medias"), createGem);
// Update
router.put("/update/:id", verifyGemUser, upload.array("medias"), updateGem);
// Delete
router.delete("/:id", verifyGemUser, deleteGem);
// Get All
router.get("/", getAllGem);
// Get By Id
router.get("/find/:id", getGem);

export default router;
