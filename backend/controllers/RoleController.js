import Role from "../models/RoleModel.js";

export const getRoles = async (req, res) => {
  try {
    const response = await Role.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getRoleById = async (req, res) => {
  try {
    const response = await Role.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createRole = async (req, res) => {
  try {
    await Role.create(req.body);
    res.status(201).json({ msg: "Role created!" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateRole = async (req, res) => {
  try {
    await Role.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Role updated!" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteRole = async (req, res) => {
  try {
    await Role.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Role deleted!" });
  } catch (error) {
    console.log(error.message);
  }
};
