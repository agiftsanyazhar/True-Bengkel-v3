import { check, validationResult } from "express-validator";
import User from "../../models/UserModel.js";
import Admin from "../../models/AdminModel.js";
import Pegawai from "../../models/PegawaiModel.js";
import Pelanggan from "../../models/PelangganModel.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const {
    role_id,
    name,
    email,
    password,
    rePassword,
    phone,
    address,
    jabatan_id,
  } = req.body;

  try {
    const checks = [
      check("role_id", "Role is required").notEmpty().isNumeric(),
      check("name", "Name is required").notEmpty(),
      check("email", "Invalid email").notEmpty().isEmail(),
      check("password", "Password is required").notEmpty(),
      check("rePassword", "Confirm password is required").notEmpty(),

      check("phone", "Phone is required").isMobilePhone("id-ID"),
      check("address", "Address is required"),
      check("jabatan_id", "Jabatan is required").isNumeric(),
    ];

    const errors = validationResult(
      await Promise.all(checks.map((check) => check.run(req)))
    );

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (password !== rePassword) {
      return res.status(400).json({ msg: "Password do not match!" });
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ msg: "Email is already registered!" });
    }

    const user = await User.create({
      role_id,
      name,
      email,
      password: hashPassword,
    });

    if (role_id === 1) {
      await Admin.create({
        name,
        email,
        user_id: user.id,
      });
    } else if (role_id === 2) {
      await Pegawai.create({
        name,
        email,
        phone,
        address,
        user_id: user.id,
        jabatan_id,
      });
    } else if (role_id === 3) {
      await Pelanggan.create({
        name,
        email,
        phone,
        address,
        user_id: user.id,
      });
    }

    res.status(201).json({ msg: "User created!" });
  } catch (error) {
    console.log(error.message);
  }
};
