import express from "express";
import {
  login,
  register,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/UserController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/user/token", refreshToken);
router.get("/user", verifyToken, getUsers);
router.get("/user/:id", getUserById);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

export default router;
