import express from "express";
import {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} from "../controllers/masterdata/RoleController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/role", verifyToken, getRoles);
router.get("/role/:id", getRoleById);
router.post("/role", verifyToken, createRole);
router.patch("/role/:id", verifyToken, updateRole);
router.delete("/role/:id", deleteRole);

export default router;
