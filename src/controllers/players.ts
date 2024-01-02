import express from "express";

export const getPlayers = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    return res.status(200).end("Will send all the Players to you!");
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
    return res
      .status(200)
      .end(
        "Will add the Player: " +
          req.body.name +
          " with details: " +
          req.body.description
      );
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
    return res
      .status(200)
      .end(
        "Will send details of the Player: " + req.params.playerId + " to you!"
      );
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
    res.write("Updating the Player: " + req.params.playerId + "\n");
    return res
      .status(200)
      .end(
        "Will update the Player: " +
          req.body.name +
          " with details: " +
          req.body.description
      );
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
    return res.status(200).end("Deleting player: " + req.params.playerId);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
