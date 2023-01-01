import express from "express";
const router = express.Router();
import {
  getAllKomentar,
  getKomentarByVideo,
  createKomentar,
  deleteOneKomentar,
} from "../controllers/komentarController.js";

router.get("/komentars", getAllKomentar);
router.get("/komentar/:videoID", getKomentarByVideo);
router.post("/komentar", createKomentar);
router.delete("/komentar/:idKomentar&:idUser", deleteOneKomentar);

export {router}
