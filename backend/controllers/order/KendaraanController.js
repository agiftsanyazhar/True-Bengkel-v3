import { check, validationResult } from "express-validator";
import Kendaraan from "../../models/KendaraanModel.js";
import Pelanggan from "../../models/PelangganModel.js";
import TipeMotor from "../../models/TipeMotorModel.js";

export const getKendaraans = async (req, res) => {
  try {
    const response = await Kendaraan.findAll({
      include: [
        {
          model: Pelanggan,
          as: "pelanggan",
        },
        {
          model: TipeMotor,
          as: "tipe_motor",
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getKendaraanById = async (req, res) => {
  try {
    const response = await Kendaraan.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Pelanggan,
          as: "pelanggan",
        },
        {
          model: TipeMotor,
          as: "tipe_motor",
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createKendaraan = async (req, res) => {
  const { stnk } = req.body;

  try {
    const checks = [
      check("stnk", "STNK is required").notEmpty(),
      check("pelanggan_id", "Pelanggan is required").notEmpty().isNumeric(),
      check("tipe_motor_id", "Tipe Motor is required").notEmpty().isNumeric(),
      check("no_mesin", "Nomor Mesin is required").notEmpty(),
      check("no_rangka", "Nomor Rangka is required").notEmpty(),
      check("tahun", "Tahun is required").notEmpty(),
      check("warna", "Warna is required").notEmpty(),
    ];

    const errors = validationResult(
      await Promise.all(checks.map((check) => check.run(req)))
    );

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const existingKendaraan = await Kendaraan.findOne({ where: { stnk } });
    if (existingKendaraan) {
      return res.status(400).json({ msg: "STNK already exists!" });
    }

    await Kendaraan.create(req.body);
    res.status(201).json({ msg: "Kendaraan created!" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateKendaraan = async (req, res) => {
  const { stnk } = req.body;

  try {
    const checks = [
      check("stnk", "STNK is required").notEmpty(),
      check("pelanggan_id", "Pelanggan is required").notEmpty().isNumeric(),
      check("tipe_motor_id", "Tipe Motor is required").notEmpty().isNumeric(),
      check("no_mesin", "Nomor Mesin is required").notEmpty(),
      check("no_rangka", "Nomor Rangka is required").notEmpty(),
      check("tahun", "Tahun is required").notEmpty(),
      check("warna", "Warna is required").notEmpty(),
    ];

    const errors = validationResult(
      await Promise.all(checks.map((check) => check.run(req)))
    );

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const existingKendaraan = await Kendaraan.findOne({ where: { stnk } });
    if (existingKendaraan) {
      return res.status(400).json({ msg: "STNK already exists!" });
    }

    await Kendaraan.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Kendaraan updated!" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteKendaraan = async (req, res) => {
  try {
    await Kendaraan.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Kendaraan deleted!" });
  } catch (error) {
    console.log(error.message);
  }
};
