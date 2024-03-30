import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    console.log("refresh token:", refreshToken);

    if (!refreshToken) {
      return res.sendStatus(401);
    }

    const user = await User.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });
    console.log("user:", user);

    if (!user) {
      return res.sendStatus(403);
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        console.log("err:", err);
        console.log("decoded:", decoded);
        if (err) {
          return res.sendStatus(403);
        }

        const userId = user.id;
        const userName = user.name;
        const userEmail = user.email;
        const accessToken = jwt.sign(
          { userId, userName, userEmail },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15s" }
        );
        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
