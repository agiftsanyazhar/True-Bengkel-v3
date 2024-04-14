import express from "express";
import {
  getJabatans,
  getJabatanById,
  createJabatan,
  updateJabatan,
  deleteJabatan,
} from "../controllers/masterdata/JabatanController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/jabatan", verifyToken, getJabatans);
router.get("/jabatan/:id", getJabatanById);
router.post("/jabatan", verifyToken, createJabatan);
router.patch("/jabatan/:id", verifyToken, updateJabatan);
router.delete("/jabatan/:id", deleteJabatan);

export default router;
