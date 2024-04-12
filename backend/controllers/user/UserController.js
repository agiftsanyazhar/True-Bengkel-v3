import Role from "../../models/RoleModel.js";
import User from "../../models/UserModel.js";
import Admin from "../../models/AdminModel.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ["id", "name", "email", "role_id", "createdAt", "updatedAt"],
      include: {
        model: Role,
        as: "role",
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "name", "email", "role_id", "createdAt", "updatedAt"],
      include: {
        model: Role,
        as: "role",
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const updateUser = async (req, res) => {
  const { name, email, password, role_id } = req.body;

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    await User.update(
      { name, email, password: hashPassword },
      { where: { id: req.params.id } }
    );
    if (role_id === 1) {
      await Admin.update(
        { name, email },
        { where: { user_id: req.params.id } }
      );
    }
    res.status(200).json({ msg: "User updated!" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "User deleted!" });
  } catch (error) {
    console.log(error.message);
  }
};
