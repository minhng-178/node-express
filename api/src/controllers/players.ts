import express from "express";
import {
  createPlayer,
  deletePlayerById,
  getPlayerById,
  getPlayers,
  updatePlayerById,
} from "../models/players";

export const getAllPlayers = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const players = await getPlayers();
    return res.render("pages/players", { players: players });
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
      return res.status(200).json(newPlayer);
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
    if (player) {
      return res.status(200).json(player);
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

    if (updatePlayer) {
      return res.status(200).json(updatedPlayer);
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
    return res.status(200).end("Deleted player: " + req.params.playerId);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
