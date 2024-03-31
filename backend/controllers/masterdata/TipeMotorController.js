import TipeMotor from "../../models/TipeMotorModel.js";

export const getTipeMotors = async (req, res) => {
  try {
    const response = await TipeMotor.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getTipeMotorById = async (req, res) => {
  try {
    const response = await TipeMotor.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createTipeMotor = async (req, res) => {
  try {
    await TipeMotor.create(req.body);
    res.status(201).json({ msg: "Tipe Motor created!" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateTipeMotor = async (req, res) => {
  try {
    await TipeMotor.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Tipe Motor updated!" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteTipeMotor = async (req, res) => {
  try {
    await TipeMotor.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Tipe Motor deleted!" });
  } catch (error) {
    console.log(error.message);
  }
};
