import { check, validationResult } from "express-validator";
import Role from "../../models/RoleModel.js";

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
  const { name } = req.body;

  try {
    const checks = [check("name", "Name is required").notEmpty()];

    const errors = validationResult(
      await Promise.all(checks.map((check) => check.run(req)))
    );

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const existingRole = await Role.findOne({ where: { name } });
    if (existingRole) {
      return res.status(400).json({ msg: "Role already exists!" });
    }

    await Role.create(req.body);
    res.status(201).json({ msg: "Role created!" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateRole = async (req, res) => {
  const { name } = req.body;

  try {
    const checks = [check("name", "Name is required").notEmpty()];

    const errors = validationResult(
      await Promise.all(checks.map((check) => check.run(req)))
    );

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const existingRole = await Role.findOne({ where: { name } });
    if (existingRole) {
      return res.status(400).json({ msg: "Role already exists!" });
    }

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
