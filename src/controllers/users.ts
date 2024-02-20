import express from "express";
import {
  deleteUserById,
  getTotalPages,
  getUserById,
  getUsers,
} from "../models/users";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;

    const users = await getUsers(page);
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
    const { id } = req.params;

    const user = getUserById(id);

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
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const user = await getUserById(id);

    user.name = name;
    await user.save();

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
