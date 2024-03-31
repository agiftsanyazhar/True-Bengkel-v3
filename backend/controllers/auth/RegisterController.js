import User from "../../models/UserModel.js";
import Admin from "../../models/AdminModel.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { name, email, password, rePassword, role_id } = req.body;

  if (password !== rePassword) {
    return res.status(400).json({ msg: "Password do not match!" });
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role_id,
    });

    if (role_id === 1) {
      await Admin.create({
        name,
        email,
        user_id: user.id,
      });
    }

    res.status(201).json({ msg: "User created!" });
  } catch (error) {
    console.log(error.message);
  }
};
