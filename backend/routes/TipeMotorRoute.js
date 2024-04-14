import express from "express";
import {
  getTipeMotors,
  getTipeMotorById,
  createTipeMotor,
  updateTipeMotor,
  deleteTipeMotor,
} from "../controllers/masterdata/TipeMotorController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/tipe-motor", verifyToken, getTipeMotors);
router.get("/tipe-motor/:id", getTipeMotorById);
router.post("/tipe-motor", verifyToken, createTipeMotor);
router.patch("/tipe-motor/:id", verifyToken, updateTipeMotor);
router.delete("/tipe-motor/:id", deleteTipeMotor);

export default router;
