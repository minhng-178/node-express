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
} from "../controllers/orchids";

export default (router: express.Router) => {
  router.get("/orchids", getAllOrchids);
  router.post("/orchids", addOrchid);
  router.put("/orchids", updateOrchids);
  router.delete("/orchids", deleteOrchids);
  router.get("/orchids/:orchidId", getOrchid);
  router.post("/orchids/:orchidId", addOrchidWithId);
  router.put("/orchids/:orchidId", updateOrchid);
  router.delete("/orchids/:orchidId", deleteOrchid);
};
