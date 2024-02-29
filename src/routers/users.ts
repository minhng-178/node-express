import express from "express";

import {
  getAllUsers,
  deleteUser,
  updateUser,
  getUserProfile,
} from "../controllers/users";
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: express.Router) => {
  router.get("/dashboard/users", isAuthenticated, getAllUsers);
  router.delete("/users/:id", isAuthenticated, isOwner, deleteUser);
  router.put("/users/edit-profile/:slug", isAuthenticated, isOwner, updateUser);
  router.get("/users/me/:slug", isAuthenticated, isOwner, getUserProfile);
};
