import SparePart from "../../models/SparePartModel.js";

export const getSpareParts = async (req, res) => {
  try {
    const response = await SparePart.findAll();
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
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createSparePart = async (req, res) => {
  try {
    await SparePart.create(req.body);
    res.status(201).json({ msg: "Spare Part created!" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateSparePart = async (req, res) => {
  try {
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
