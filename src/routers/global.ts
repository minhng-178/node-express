import express from "express";

import {
  getAboutPage,
  getHomePage,
  getLoginPage,
  getOrchidDetailPage,
  getRegisterPage,
} from "../controllers/global";

export default (router: express.Router) => {
  router.get("/", getHomePage);
  router.get("/about", getAboutPage);
  router.get("/login", getLoginPage);
  router.get("/register", getRegisterPage);
  router.get("/orchidDetail/:slug", getOrchidDetailPage);
};
