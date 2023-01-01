import express from "express";
const router = express.Router();
import {
  createUser,
  deleteUser,
  getAllUser,
  loginUser,
  updateOneUser,
} from "../controllers/userController.js";

router.get("/users", getAllUser);
router.get("/user/:email&:pass", loginUser);
router.post("/user", createUser);
router.delete("/user", deleteUser);
router.put("/user/:id", updateOneUser);

export { router };
