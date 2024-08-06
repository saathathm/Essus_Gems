import express from "express";
import { login, register } from "../controllers/authController.js";
const router = express.Router();
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";

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

router.post("/register", upload.single("avatar"), register);

router.post("/login", login);

export default router;
