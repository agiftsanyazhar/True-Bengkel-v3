import express from "express";
import {
  getSpareParts,
  getSparePartById,
  createSparePart,
  updateSparePart,
  deleteSparePart,
} from "../controllers/masterdata/SparePartController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/spare-part", verifyToken, getSpareParts);
router.get("/spare-part/:id", verifyToken, getSparePartById);
router.post("/spare-part", verifyToken, createSparePart);
router.patch("/spare-part/:id", verifyToken, updateSparePart);
router.delete("/spare-part/:id", verifyToken, deleteSparePart);

export default router;
