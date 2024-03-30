import express from "express";
import {
  register,
  login,
  logout,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/UserController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.delete("/logout", logout);
router.get("/user/token", refreshToken);
router.get("/user", verifyToken, getUsers);
router.get("/user/:id", getUserById);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

export default router;
