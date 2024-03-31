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
  try {
    await Kendaraan.create(req.body);
    res.status(201).json({ msg: "Kendaraan created!" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateKendaraan = async (req, res) => {
  try {
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
