import User from "../../models/UserModel.js";
import Pelanggan from "../../models/PelangganModel.js";

export const getPelanggans = async (req, res) => {
  try {
    const response = await Pelanggan.findAll({
      attributes: [
        "id",
        "name",
        "email",
        "phone",
        "address",
        "user_id",
        "createdAt",
        "updatedAt",
      ],
      include: [
        {
          model: User,
          as: "user",
          attributes: [
            "id",
            "name",
            "email",
            "role_id",
            "createdAt",
            "updatedAt",
          ],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getPelangganById = async (req, res) => {
  try {
    const response = await Pelanggan.findOne({
      where: {
        id: req.params.id,
      },
      attributes: [
        "id",
        "name",
        "email",
        "phone",
        "address",
        "user_id",
        "createdAt",
        "updatedAt",
      ],
      include: [
        {
          model: User,
          as: "user",
          attributes: [
            "id",
            "name",
            "email",
            "role_id",
            "createdAt",
            "updatedAt",
          ],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const countPelanggan = async (req, res) => {
  try {
    const response = await Pelanggan.count();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};
