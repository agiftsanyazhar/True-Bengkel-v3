import User from "../../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res
        .status(400)
        .json({ msg: "These credentials do not match our records." });
    }

    const id = user.id;
    const name = user.name;
    const email = user.email;
    const role_id = user.role_id;
    const accessToken = jwt.sign(
      { id, name, email, role_id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15s" }
    );
    const refreshToken = jwt.sign(
      { id, name, email, role_id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    await User.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: id,
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

export const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.sendStatus(204);
  }

  const user = await User.findOne({
    where: {
      refresh_token: refreshToken,
    },
  });

  if (!user) {
    return res.sendStatus(204);
  }

  const id = user.id;

  await User.update(
    { refresh_token: null },
    {
      where: {
        id: id,
      },
    }
  );

  res.clearCookie("refreshToken");

  return res.sendStatus(200);
};
