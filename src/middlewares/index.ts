import express from "express";
import jwt from "jsonwebtoken";
import { merge, get } from "lodash";

import { User, getUserById, getUserBySlug } from "../models/users";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const refreshToken = req.cookies.jwt;

    if (!refreshToken) {
      return res.status(403).json({ message: "No refresh token provided." });
    }

    // Verify the refresh token
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err: jwt.VerifyErrors, payload: any) => {
        if (err) {
          return res.status(403).json({ message: "Invalid refresh token." });
        }

        // Check if the refresh token exists in the database
        const existingUser = await User.findOne({
          _id: payload.userId,
          "authentication.refreshToken": refreshToken,
        }).select("+authentication.refreshToken");

        if (!existingUser) {
          return res.status(403).json({ message: "Refresh token not found." });
        }

        // Attach user to the request object
        merge(req, { user: existingUser });
        next();
      }
    );
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "An error occurred during authentication." });
  }
};

export const isAdmin = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const currentUserId = get(req, "user._id") as string;

    if (!currentUserId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const currentUser = await getUserById(currentUserId);

    if (!currentUser) {
      return res.status(400).json({ message: "User not found." });
    }

    if (!currentUser.isAdmin) {
      return res.status(403).json({ message: "User is not an admin." });
    }

    next();
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "An error occurred during authentication." });
  }
};

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id, slug } = req.params;
    const currentUserId = get(req, "user._id") as string;

    if (!currentUserId) {
      return res.sendStatus(400);
    }

    // If both id and slug are not provided
    if (!id && !slug) {
      return res.sendStatus(400);
    }

    // If id is provided, check if it matches the current user's id
    if (id && currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }

    // If slug is provided, retrieve the user with this slug and check if it matches the current user
    if (slug) {
      const user = await getUserBySlug(slug);
      // Assuming User is your user model
      if (!user || user._id.toString() !== currentUserId.toString()) {
        return res.sendStatus(403);
      }
    }

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
