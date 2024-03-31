import express from "express";
import {
  getAdmins,
  getAdminById,
} from "../controllers/admin/user/AdminController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/admin", getAdmins);
router.get("/admin/:id", getAdminById);

export default router;
