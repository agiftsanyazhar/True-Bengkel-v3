import express from "express";
import {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} from "../controllers/admin/masterdata/RoleController.js";

const router = express.Router();

router.get("/role", getRoles);
router.get("/role/:id", getRoleById);
router.post("/role", createRole);
router.patch("/role/:id", updateRole);
router.delete("/role/:id", deleteRole);

export default router;
