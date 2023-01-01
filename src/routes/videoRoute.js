import express from "express";
const router = express.Router();
import {
  createVideo,
  deleteOneVideo,
  getAllVideo,
  getNewest,
  getOneVideo,
  getVideos,
} from "../controllers/videoController.js";

router.get("/videos", getAllVideo);
router.get("/video/find/:name", getVideos);
router.get("/video/sort/", getNewest);
router.get("/video/:id", getOneVideo);
router.post("/video", createVideo);
router.delete("/video/:id", deleteOneVideo);

export { router };
