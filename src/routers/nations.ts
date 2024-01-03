import express from "express";
import {
  addNation,
  addNationWithId,
  deleteNation,
  deleteNations,
  getNation,
  getAllNations,
  updateNation,
  updateNations,
} from "../controllers/nations";

export default (router: express.Router) => {
  router.get("/nations", getAllNations);
  router.post("/nations", addNation);
  router.put("/nations", updateNations);
  router.delete("/nations", deleteNations);
  router.get("/nations/:nationId", getNation);
  router.post("/nations/:nationId", addNationWithId);
  router.put("/nations/:nationId", updateNation);
  router.delete("/nations/:nationId", deleteNation);
};
