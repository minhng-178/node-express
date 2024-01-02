import express from "express";
import {
  addPlayer,
  addPlayerWithId,
  deletePlayer,
  deletePlayers,
  getPlayer,
  getPlayers,
  updatePlayer,
  updatePlayers,
} from "../controllers/players";

export default (router: express.Router) => {
  router.get("/players", getPlayers);
  router.post("/players", addPlayer);
  router.put("/players", updatePlayers);
  router.delete("/players", deletePlayers);
  router.get("/players/:playerId", getPlayer);
  router.post("/players/:playerId", addPlayerWithId);
  router.put("/players/:playerId", updatePlayer);
  router.delete("/players/:playerId", deletePlayer);
};
