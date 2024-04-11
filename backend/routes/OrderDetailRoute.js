import express from "express";
import {
  getOrderDetails,
  getOrderDetailById,
  createOrderDetail,
} from "../controllers/order/OrderDetailController.js";

const router = express.Router();

router.get("/detil-order", getOrderDetails);
router.get("/detil-order/:id", getOrderDetailById);
router.post("/detil-order", createOrderDetail);

export default router;
