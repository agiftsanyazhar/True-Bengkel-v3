import express from "express";
import {
  getUsers,
  getUserById,
  countUser,
  updateUser,
  deleteUser,
} from "../controllers/user/UserController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/user", verifyToken, getUsers);
router.get("/user/:id", getUserById);
router.get("/total-user", verifyToken, countUser);
router.patch("/user/:id", verifyToken, updateUser);
router.delete("/user/:id", deleteUser);

export default router;
