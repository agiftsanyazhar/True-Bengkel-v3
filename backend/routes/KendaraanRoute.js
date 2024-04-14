import express from "express";
import {
  getKendaraans,
  getKendaraanById,
  createKendaraan,
  updateKendaraan,
  deleteKendaraan,
} from "../controllers/order/KendaraanController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/kendaraan", verifyToken, getKendaraans);
router.get("/kendaraan/:id", verifyToken, getKendaraanById);
router.post("/kendaraan", verifyToken, createKendaraan);
router.patch("/kendaraan/:id", verifyToken, updateKendaraan);
router.delete("/kendaraan/:id", verifyToken, deleteKendaraan);

export default router;
