import { check, validationResult } from "express-validator";
import Jabatan from "../../models/JabatanModel.js";

export const getJabatans = async (req, res) => {
  try {
    const response = await Jabatan.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getJabatanById = async (req, res) => {
  try {
    const response = await Jabatan.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createJabatan = async (req, res) => {
  const { name } = req.body;

  try {
    const checks = [
      check("name", "Name is required").notEmpty(),
      check("gaji_pokok", "Gaji Pokok is required").notEmpty().isNumeric(),
      check("tunjangan", "Tunjangan is required").notEmpty().isNumeric(),
    ];

    const errors = validationResult(
      await Promise.all(checks.map((check) => check.run(req)))
    );

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const existingJabatan = await Jabatan.findOne({ where: { name } });
    if (existingJabatan) {
      return res.status(400).json({ msg: "Jabatan already exists!" });
    }

    await Jabatan.create(req.body);
    res.status(201).json({ msg: "Jabatan created!" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateJabatan = async (req, res) => {
  const { name } = req.body;

  try {
    const checks = [
      check("name", "Name is required").notEmpty(),
      check("gaji_pokok", "Gaji Pokok is required").notEmpty().isNumeric(),
      check("tunjangan", "Tunjangan is required").notEmpty().isNumeric(),
    ];

    const errors = validationResult(
      await Promise.all(checks.map((check) => check.run(req)))
    );

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const existingJabatan = await Jabatan.findOne({ where: { name } });
    if (existingJabatan) {
      return res.status(400).json({ msg: "Jabatan already exists!" });
    }

    await Jabatan.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Jabatan updated!" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteJabatan = async (req, res) => {
  try {
    await Jabatan.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Jabatan deleted!" });
  } catch (error) {
    console.log(error.message);
  }
};
