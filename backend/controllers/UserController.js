import User from "../models/UserModel.js";
import Role from "../models/RoleModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ["id", "name", "email"],
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

export const countUser = async (req, res) => {
  try {
    const response = await User.count();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findAll({
      where: {
        email: req.body.email,
      },
    });

    const match = await bcrypt.compare(req.body.password, user[0].password);

    if (!match) {
      return res
        .status(400)
        .json({ msg: "These credentials do not match our records." });
    }

    const userId = user[0].id;
    const userName = user[0].name;
    const userEmail = user[0].email;
    const accessToken = jwt.sign(
      { userId, userName, userEmail },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "20s" }
    );
    const refreshToken = jwt.sign(
      { userId, userName, userEmail },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    await User.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
    });

    res.json({ accessToken });
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "These credentials do not match our records." });
  }
};

export const register = async (req, res) => {
  const { name, email, password, rePassword, role_id } = req.body;

  if (password !== rePassword) {
    return res.status(400).json({ msg: "Password do not match!" });
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    await User.create({
      name: name,
      email: email,
      password: hashPassword,
      role_id: role_id,
    });

    res.status(201).json({ msg: "User created!" });
  } catch (error) {
    console.log(error.message);
  }
};

export const createUser = async (req, res) => {
  try {
    await User.create(req.body);
    res.status(201).json({ msg: "User created!" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateUser = async (req, res) => {
  try {
    await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
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
