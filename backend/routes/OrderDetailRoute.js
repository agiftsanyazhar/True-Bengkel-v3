import express from "express";
import {
  getOrderDetails,
  getOrderDetailByOrderId,
  createOrderDetail,
} from "../controllers/order/OrderDetailController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/detil-order", verifyToken, getOrderDetails);
router.get("/detil-order/:order_id", getOrderDetailByOrderId);
router.post("/detil-order", verifyToken, createOrderDetail);

export default router;
