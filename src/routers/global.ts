import express from "express";

import {
  getAboutPage,
  getError404Page,
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
  router.get("/not-found", getError404Page);
  router.get("/orchidDetail/:slug", getOrchidDetailPage);
};
