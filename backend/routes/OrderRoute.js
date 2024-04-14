import express from "express";
import {
  getOrders,
  getOrderById,
  countOrder,
  sumTotalIncome,
  createOrder,
  updateOrder,
} from "../controllers/order/OrderController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/order", verifyToken, getOrders);
router.get("/order/:id", getOrderById);
router.get("/total-order", verifyToken, countOrder);
router.get("/total-income", verifyToken, sumTotalIncome);
router.post("/order", verifyToken, createOrder);
router.patch("/order/:id", verifyToken, updateOrder);

export default router;
