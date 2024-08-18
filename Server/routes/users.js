import express from "express";
const router = express.Router();
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";
import {
  deleteUser,
  getAll,
  getById,
  updateUser,
} from "../controllers/userController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "..", "uploads/user"));
    },
    filename: function (req, file, cb) {
      const fileExtension = path.extname(file.originalname);
      cb(null, Date.now() + fileExtension);
    },
  }),
});

// Update User
router.put("/:id", verifyUser, upload.single("avatar"), updateUser);
// Delete User
router.delete("/:id", verifyUser, deleteUser);
// Get All Users
router.get("/", getAll);
// Get By Id
router.get("/find/:id", getById);

export default router;
