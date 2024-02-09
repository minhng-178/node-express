import express from "express";
import {
  addOrchid,
  addOrchidWithId,
  deleteOrchid,
  deleteOrchids,
  getOrchid,
  getAllOrchids,
  updateOrchid,
  updateOrchids,
  createFormOrchid,
} from "../controllers/orchids";
import { isAdmin, isAuthenticated } from "../middlewares";

export default (router: express.Router) => {
  router.get("/orchids", isAuthenticated, getAllOrchids);
  router.get("/orchids/formCreate", isAuthenticated, isAdmin, createFormOrchid);
  router.post("/orchids", isAuthenticated, isAdmin, addOrchid);
  router.put("/orchids", isAuthenticated, isAdmin, updateOrchids);
  router.delete("/orchids", isAuthenticated, isAdmin, deleteOrchids);
  router.get("/orchids/:orchidId", isAuthenticated, isAdmin, getOrchid);
  router.post("/orchids/:orchidId", isAuthenticated, isAdmin, addOrchidWithId);
  router.put("/orchids/:orchidId", isAuthenticated, isAdmin, updateOrchid);
  router.delete("/orchids/:orchidId", isAuthenticated, isAdmin, deleteOrchid);
};
