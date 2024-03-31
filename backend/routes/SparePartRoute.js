import express from "express";
import {
  getSpareParts,
  getSparePartById,
  createSparePart,
  updateSparePart,
  deleteSparePart,
} from "../controllers/masterdata/SparePartController.js";

const router = express.Router();

router.get("/spare-part", getSpareParts);
router.get("/spare-part/:id", getSparePartById);
router.post("/spare-part", createSparePart);
router.patch("/spare-part/:id", updateSparePart);
router.delete("/spare-part/:id", deleteSparePart);

export default router;
