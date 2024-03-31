import express from "express";
import {
  getTipeMotors,
  getTipeMotorById,
  createTipeMotor,
  updateTipeMotor,
  deleteTipeMotor,
} from "../controllers/masterdata/TipeMotorController.js";

const router = express.Router();

router.get("/tipe-motor", getTipeMotors);
router.get("/tipe-motor/:id", getTipeMotorById);
router.post("/tipe-motor", createTipeMotor);
router.patch("/tipe-motor/:id", updateTipeMotor);
router.delete("/tipe-motor/:id", deleteTipeMotor);

export default router;
