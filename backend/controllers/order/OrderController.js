import { check, validationResult } from "express-validator";
import Order from "../../models/OrderModel.js";
import Pelanggan from "../../models/PelangganModel.js";
import OrderDetail from "../../models/OrderDetailModel.js";

export const getOrders = async (req, res) => {
  try {
    const response = await Order.findAll({
      include: [
        {
          model: Pelanggan,
          as: "pelanggan",
        },
        {
          model: OrderDetail,
          as: "order_details",
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getOrderById = async (req, res) => {
  try {
    const response = await Order.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Pelanggan,
          as: "pelanggan",
        },
        {
          model: OrderDetail,
          as: "order_details",
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const countOrder = async (req, res) => {
  try {
    const response = await Order.count();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const sumTotalIncome = async (req, res) => {
  try {
    const response = await Order.sum("total_shopping");
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createOrder = async (req, res) => {
  const { order_code } = req.body;

  try {
    const checks = [
      check("pelanggan_id", "Pelanggan is required").notEmpty().isNumeric(),
      check("is_paid", "Payment Status is required").notEmpty().isNumeric(),
      check("total_shopping", "Total Shopping is required")
        .notEmpty()
        .isNumeric(),
    ];

    const errors = validationResult(
      await Promise.all(checks.map((check) => check.run(req)))
    );

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const generatedOrderCode = generateOrderCode();

    await Order.create({ ...req.body, order_code: generatedOrderCode });
    res.status(201).json({ msg: "Order created!" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateOrder = async (req, res) => {
  try {
    const checks = [
      check("pelanggan_id", "Pelanggan is required").notEmpty().isNumeric(),
    ];

    const errors = validationResult(
      await Promise.all(checks.map((check) => check.run(req)))
    );

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    await Order.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Order updated!" });
  } catch (error) {
    console.log(error.message);
  }
};

function generateOrderCode() {
  const now = new Date();

  const year = now.getFullYear().toString();
  const month = ("0" + (now.getMonth() + 1)).slice(-2);
  const day = ("0" + now.getDate()).slice(-2);
  const hours = ("0" + now.getHours()).slice(-2);
  const minutes = ("0" + now.getMinutes()).slice(-2);
  const seconds = ("0" + now.getSeconds()).slice(-2);

  const orderCode = `ODR-${day}${month}${year}${hours}${minutes}${seconds}`;

  return orderCode;
}
