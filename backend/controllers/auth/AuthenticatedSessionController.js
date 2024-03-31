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

    const userId = user.id;
    const userName = user.name;
    const userEmail = user.email;
    const accessToken = jwt.sign(
      { userId, userName, userEmail },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15s" }
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

  const userId = user.id;

  await User.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );

  res.clearCookie("refreshToken");

  return res.sendStatus(200);
};
