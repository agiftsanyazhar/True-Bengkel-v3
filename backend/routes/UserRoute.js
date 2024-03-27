import express from "express";
import {
  getUsers,
  getUserById,
  register,
  login,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/UserController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.get("/user", verifyToken, getUsers);
router.get("/user/:id", getUserById);
router.post("/user/register", register);
router.post("/user/login", login);
router.get("/user/token", refreshToken);
router.post("/user", createUser);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

export default router;
