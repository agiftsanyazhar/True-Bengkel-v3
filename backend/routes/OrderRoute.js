import express from "express";
import {
  getOrders,
  getOrderById,
  countOrder,
  sumTotalIncome,
  createOrder,
  updateOrder,
} from "../controllers/order/OrderController.js";

const router = express.Router();

router.get("/order", getOrders);
router.get("/order/:id", getOrderById);
router.get("/total-order", countOrder);
router.get("/total-income", sumTotalIncome);
router.post("/order", createOrder);
router.patch("/order/:id", updateOrder);

export default router;
