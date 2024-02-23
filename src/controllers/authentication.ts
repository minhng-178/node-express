import express from "express";
import jwt from "jsonwebtoken";
import {
  User,
  changeNewPassword,
  createUser,
  getUserByEmail,
} from "../models/users";
import { authentication, random } from "../helpers";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const cookies = req.cookies;

    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password != expectedHash) {
      return res.status(403).json({ message: "Invalid password." });
    }

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10s" }
    );
    const newRefreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    let newRefreshTokenArray =
      !cookies?.jwt || !user.authentication.refreshToken
        ? user.authentication.refreshToken
        : user.authentication.refreshToken.filter((rt) => rt !== cookies.jwt);

    // If cookies.jwt does not exist, create it
    if (!cookies?.jwt) {
      res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      });
      user.authentication.refreshToken = [newRefreshToken];
      await user.save();
      return res.status(200).json({ accessToken });
    }

    if (cookies?.jwt) {
      const refreshToken = cookies.jwt;

      const foundToken = await User.findOne({
        "authentication.refreshToken": refreshToken,
      }).select("+authentication.refreshToken");

      if (!foundToken) {
        console.log("attempted refresh token reuse at login!");
        newRefreshTokenArray = [];
        return res.status(400).json({ message: "Invalid refresh token." });
      } else {
        res.clearCookie("jwt", {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });

        if (newRefreshTokenArray && foundToken.authentication.refreshToken) {
          foundToken.authentication.refreshToken = [
            ...newRefreshTokenArray,
            newRefreshToken,
          ];
        }

        res.cookie("jwt", newRefreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 24 * 60 * 60 * 1000,
        });
        const result = await foundToken.save();

        return res.status(200).json({ accessToken });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "An error occurred during login." });
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.sendStatus(400);
    }

    const salt = random();
    const user = await createUser({
      email,
      name,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const logout = async (req: express.Request, res: express.Response) => {
  try {
    const refreshToken = req.cookies.jwt;

    if (!refreshToken) {
      return res.status(400).json({ message: "No refresh token provided." });
    }

    // Find the user with the refresh token
    const user = await User.findOne({
      "authentication.refreshToken": refreshToken,
    }).select("+authentication.refreshToken");

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    // Remove the refresh token from the user
    user.authentication.refreshToken = user.authentication.refreshToken.filter(
      (token) => token !== refreshToken
    );
    await user.save();

    // Clear the JWT cookie
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    return res.status(200).render("pages/login");
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "An error occurred during logout." });
  }
};

export const changePassword = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    if (!email || !oldPassword || !newPassword) {
      return res.status(400).json({
        message: "Email, old password and new password are required.",
      });
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    const expectedHash = authentication(user.authentication.salt, oldPassword);

    if (user.authentication.password != expectedHash) {
      return res.status(403).json({ message: "Invalid old password." });
    }

    const newSalt = random();
    const newHash = authentication(newSalt, newPassword);

    await changeNewPassword(email, newSalt, newHash);

    return res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
