import express from "express";
import {
  getJabatans,
  getJabatanById,
  createJabatan,
  updateJabatan,
  deleteJabatan,
} from "../controllers/masterdata/JabatanController.js";

const router = express.Router();

router.get("/jabatan", getJabatans);
router.get("/jabatan/:id", getJabatanById);
router.post("/jabatan", createJabatan);
router.patch("/jabatan/:id", updateJabatan);
router.delete("/jabatan/:id", deleteJabatan);

export default router;
