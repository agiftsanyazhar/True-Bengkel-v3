import Jabatan from "../../../models/JabatanModel.js";

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
  try {
    await Jabatan.create(req.body);
    res.status(201).json({ msg: "Jabatan created!" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateJabatan = async (req, res) => {
  try {
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
