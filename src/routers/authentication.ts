import express from "express";

import {
  changePassword,
  login,
  logout,
  register,
} from "../controllers/authentication";

export default (router: express.Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
  router.get("/auth/logout", logout);
  router.post("/auth/change-password", changePassword);
};
