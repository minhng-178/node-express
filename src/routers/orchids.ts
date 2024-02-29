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
  router.get("/dashboard/orchids", isAuthenticated, isAdmin, getAllOrchids);
  router.get(
    "/dashboard/orchids/formCreate",
    isAuthenticated,
    isAdmin,
    createFormOrchid
  );
  router.post("/dashboard/orchids", isAuthenticated, isAdmin, addOrchid);
  router.put("/dashboard/orchids", isAuthenticated, isAdmin, updateOrchids);
  router.delete("/dashboard/orchids", isAuthenticated, isAdmin, deleteOrchids);
  router.get(
    "/dashboard/orchids/:orchidId",
    isAuthenticated,
    isAdmin,
    getOrchid
  );
  router.post(
    "/dashboard/orchids/:orchidId",
    isAuthenticated,
    isAdmin,
    addOrchidWithId
  );
  router.put(
    "/dashboard/orchids/:orchidId",
    isAuthenticated,
    isAdmin,
    updateOrchid
  );
  router.delete(
    "/dashboard/orchids/:orchidId",
    isAuthenticated,
    isAdmin,
    deleteOrchid
  );
};
