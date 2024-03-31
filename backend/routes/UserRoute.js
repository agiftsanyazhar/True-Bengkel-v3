import express from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/admin/user/UserController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/user", verifyToken, getUsers);
router.get("/user/:id", getUserById);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

export default router;
