import bodyParser from "body-parser";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
import fs from "fs";

// const komentarRouter from ("./src/routes/komentarRoute");
import { router as userRouter } from "./src/routes/userRoute.js";
import { router as videoRouter } from "./src/routes/videoRoute.js";
import { router as komentarRouter } from "./src/routes/komentarRoute.js";
import {
  authenticateGoogle,
  uploadToGoogleDrive,
} from "./src/services/googleDriveServices.js";
import { multer } from "./src/middlewares/multerFileHandler.js";

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use(process.env.MAIN_ROUTE, userRouter);
app.use(process.env.MAIN_ROUTE, videoRouter);
app.use(process.env.MAIN_ROUTE, komentarRouter);

app.use((error, req, res, next) => {
  const data = error.data;
  const status = error.status || 500;
  const message = error.message;
  res.status(status).json({
    message: message,
    data: data,
  });
  next();
});

const deleteFile = (filePath) => {
  fs.unlink(filePath, () => {
    console.log("file deleted");
  });
};

app.post("/upload-file", multer.single("file"), async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400).send("No file uploaded.");
      return;
    }
    const auth = authenticateGoogle();
    const response = await uploadToGoogleDrive(req.file, auth);
    deleteFile(req.file.path);
    res.status(200).json({ response });
  } catch (err) {
    console.log(err);
  }
});

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log("Database connected Succesfully");
      console.log(`listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("F*ck errror :)");
    console.log(err);
  });
