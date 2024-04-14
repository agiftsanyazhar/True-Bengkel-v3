import express from "express";
import {
  getOrderDetails,
  getOrderDetailById,
  createOrderDetail,
} from "../controllers/order/OrderDetailController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/detil-order", verifyToken, getOrderDetails);
router.get("/detil-order/:id", getOrderDetailById);
router.post("/detil-order", verifyToken, createOrderDetail);

export default router;
