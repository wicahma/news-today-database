import express from "express";
const router = express.Router();
import {
  createVideo,
  deleteOneVideo,
  getAllVideo,
  getNewest,
  getOneVideo,
  getVideos,
  uploadToDatabase,
} from "../controllers/videoController.js";
import { multer } from "../middlewares/multerFileHandler.js";

router.get("/videos", getAllVideo);
router.get("/video/find/:name", getVideos);
router.get("/video/sort/", getNewest);
router.get("/video/:id", getOneVideo);
router.post("/video", createVideo);
router.delete("/video/:id", deleteOneVideo);
router.post("/upload-file", multer.single("file"), uploadToDatabase);

export { router };
