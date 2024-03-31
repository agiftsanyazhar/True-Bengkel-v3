import express from "express";
import {
  getKendaraans,
  getKendaraanById,
  createKendaraan,
  updateKendaraan,
  deleteKendaraan,
} from "../controllers/order/KendaraanController.js";

const router = express.Router();

router.get("/kendaraan", getKendaraans);
router.get("/kendaraan/:id", getKendaraanById);
router.post("/kendaraan", createKendaraan);
router.patch("/kendaraan/:id", updateKendaraan);
router.delete("/kendaraan/:id", deleteKendaraan);

export default router;
