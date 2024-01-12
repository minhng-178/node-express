import express from "express";
import {
  createPlayer,
  deletePlayerById,
  getPlayerById,
  getPlayers,
  updatePlayerById,
} from "../models/players";

const clubData = [
  { id: "1", name: "Arsenal" },
  { id: "2", name: "Manchester United" },
  { id: "3", name: "Chelsea" },
  { id: "4", name: "Manchester City" },
  { id: "5", name: "PSG" },
  { id: "6", name: "Inter Milan" },
  { id: "7", name: "Real Madrid" },
  { id: "8", name: "Barcelona" },
];

export const getAllPlayers = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const players = await getPlayers();
    return res.render("pages/players", {
      players: players,
      clubList: clubData,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const addPlayer = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const newPlayer = await createPlayer(req.body);

    if (newPlayer) {
      res.redirect("/players");
    } else return res.status(403).end("No request found!");
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
export const updatePlayers = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    return res.status(403).end("PUT operation not supported on /players");
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const deletePlayers = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    return res.status(403).end("Deleting all players");
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const getPlayer = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const player = await getPlayerById(req.params.playerId);
    const players = await getPlayers();
    if (player) {
      res.render("pages/player", {
        player: player,
        players: players,
        clubList: clubData,
      });
    } else return res.status(403).end("No request found!");
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const addPlayerWithId = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    return res
      .status(403)
      .end("POST operation not supported on /players/" + req.params.PlayerId);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const updatePlayer = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const updatedPlayer = await updatePlayerById(req.params.playerId, req.body);

    if (updatedPlayer) {
      res.redirect(`/players/${req.params.playerId}`);
    } else return res.status(403).end("No request found!");
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const deletePlayer = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    await deletePlayerById(req.params.playerId);
    return res.redirect("/players");
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
