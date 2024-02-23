import express from "express";
import {
  deleteUserById,
  getTotalPages,
  getUserByEmail,
  getUserById,
  getUserBySlug,
  getUsers,
} from "../models/users";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const name = (req.query.name as string) || "";
    const page = parseInt(req.query.page as string) || 1;

    const users = await getUsers(page, name);
    const totalPages = await getTotalPages();

    return res.render("pages/users", {
      users: users,
      page: page,
      totalPages: totalPages,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getUserProfile = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const user = await getUserBySlug(req.params.slug);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.render("pages/profile", { user: user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);

    return res.json(deletedUser);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { slug } = req.params;
    const { avatar, name, email, bio, YOB } = req.body;

    if (!name || !email || !avatar) {
      return res.sendStatus(401);
    }

    const user = await getUserBySlug(slug);

    if (email !== user.email) {
      const existingUser = await getUserByEmail(email);

      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" }).end();
      }

      user.email = email;
    }
    user.avatar = avatar;
    user.name = name;
    user.bio = bio;
    user.YOB = YOB;
    await user.save();

    return res.status(200).render("pages/profile");
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
