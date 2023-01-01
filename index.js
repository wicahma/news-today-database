import bodyParser from "body-parser";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();


import { router as userRouter } from "./src/routes/userRoute.js";
import { router as videoRouter } from "./src/routes/videoRoute.js";
import { router as komentarRouter } from "./src/routes/komentarRoute.js";


const mainRoute = "/api";
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
  })
);

const port = process.env.PORT || 5000;

app.use(mainRoute, userRouter);
app.use(mainRoute, videoRouter);
app.use(mainRoute, komentarRouter);

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

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected Succesfully");
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("F*ck errror :)");
    console.log(err);
    process.exit(1);
  });

export default app;
