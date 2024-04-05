import { check, validationResult } from "express-validator";
import TipeMotor from "../../models/TipeMotorModel.js";
import SparePart from "../../models/SparePartModel.js";

export const getSpareParts = async (req, res) => {
  try {
    const response = await SparePart.findAll({
      include: {
        model: TipeMotor,
        as: "tipe_motor",
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getSparePartById = async (req, res) => {
  try {
    const response = await SparePart.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: TipeMotor,
        as: "tipe_motor",
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createSparePart = async (req, res) => {
  const { spare_part_code } = req.body;

  try {
    const checks = [
      check("spare_part_code", "Spare Part Code is required").notEmpty(),
      check("tipe_motor_id", "Tipe Motor is required").notEmpty().isNumeric(),
      check("name", "Name is required").notEmpty(),
      check("stock", "Stock is required").notEmpty().isNumeric(),
      check("price", "Price is required").notEmpty().isNumeric(),
    ];

    const errors = validationResult(
      await Promise.all(checks.map((check) => check.run(req)))
    );

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const existingSparePart = await SparePart.findOne({
      where: { spare_part_code },
    });
    if (existingSparePart) {
      return res.status(400).json({ msg: "Spare Part already exists!" });
    }

    await SparePart.create(req.body);
    res.status(201).json({ msg: "Spare Part created!" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateSparePart = async (req, res) => {
  const { spare_part_code } = req.body;

  try {
    const checks = [
      check("spare_part_code", "Spare Part Code is required").notEmpty(),
      check("tipe_motor_id", "Tipe Motor is required").notEmpty().isNumeric(),
      check("name", "Name is required").notEmpty(),
      check("stock", "Stock is required").notEmpty().isNumeric(),
      check("price", "Price is required").notEmpty().isNumeric(),
    ];

    const errors = validationResult(
      await Promise.all(checks.map((check) => check.run(req)))
    );

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const existingSparePart = await SparePart.findOne({
      where: { spare_part_code },
    });
    if (existingSparePart) {
      return res.status(400).json({ msg: "Spare Part already exists!" });
    }

    await SparePart.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Spare Part updated!" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteSparePart = async (req, res) => {
  try {
    await SparePart.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Spare Part deleted!" });
  } catch (error) {
    console.log(error.message);
  }
};
