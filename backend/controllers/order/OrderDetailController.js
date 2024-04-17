import { check, validationResult } from "express-validator";
import OrderDetail from "../../models/OrderDetailModel.js";
import Order from "../../models/OrderModel.js";
import SparePart from "../../models/SparePartModel.js";

export const getOrderDetails = async (req, res) => {
  try {
    const response = await OrderDetail.findAll({
      include: [
        {
          model: Order,
          as: "order",
        },
        {
          model: SparePart,
          as: "spare_part",
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getOrderDetailByOrderId = async (req, res) => {
  try {
    const response = await OrderDetail.findAll({
      where: {
        order_id: req.params.order_id,
      },
      include: [
        {
          model: Order,
          as: "order",
        },
        {
          model: SparePart,
          as: "spare_part",
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createOrderDetail = async (req, res) => {
  try {
    const checks = [
      check("order_id", "Order is required").notEmpty().isNumeric(),
      check("spare_part_id", "Spare Part is required").notEmpty().isNumeric(),
      check("qty", "Quantity is required").notEmpty().isNumeric(),
      check("harga_satuan", "Harga Satuan is required").notEmpty().isNumeric(),
    ];

    const errors = validationResult(
      await Promise.all(checks.map((check) => check.run(req)))
    );

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { spare_part_id, qty } = req.body;

    // Fetch the spare part
    const sparePart = await SparePart.findByPk(spare_part_id);

    // Check if there's enough stock
    if (sparePart.stock < qty) {
      return res.status(400).json({ msg: "Not enough stock!" });
    }

    // Create the order detail
    await OrderDetail.create(req.body);

    // Update the spare part's stock
    sparePart.stock -= qty;
    await sparePart.save();

    res.status(201).json({ msg: "Order Detail created!" });
  } catch (error) {
    console.log(error.message);
  }
};
