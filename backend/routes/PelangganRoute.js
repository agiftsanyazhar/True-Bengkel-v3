import express from "express";
import {
  getPelanggans,
  getPelangganById,
} from "../controllers/user/PelangganController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/Pelanggan", verifyToken, getPelanggans);
router.get("/Pelanggan/:id", getPelangganById);

export default router;
