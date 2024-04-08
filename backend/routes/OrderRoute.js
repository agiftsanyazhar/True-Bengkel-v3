import express from "express";
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
} from "../controllers/order/OrderController.js";

const router = express.Router();

router.get("/order", getOrders);
router.get("/order/:id", getOrderById);
router.post("/order", createOrder);
router.patch("/order/:id", updateOrder);

export default router;
