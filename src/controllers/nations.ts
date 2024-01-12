import express from "express";
import {
  createNation,
  deleteNationById,
  getNationById,
  getNations,
  updateNationById,
} from "../models/nations";
import { getPlayers } from "../models/players";

export const getAllNations = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const nations = await getNations();
    return res.render("pages/nations", {
      nations: nations,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const addNation = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const newNation = await createNation(req.body);
    if (newNation) {
      return res.redirect("/nations");
    } else return res.sendStatus(403).end("No request found!");
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const updateNations = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    return res.status(403).end("PUT operation not supported on /nations");
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const deleteNations = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    return res.status(403).end("Deleting all nations");
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const getNation = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const nation = await getNationById(req.params.nationId);
    const nations = await getNations();
    if (nation) {
      return res.render("pages/nation", { nation: nation, nations: nations });
    } else return res.sendStatus(403).end("No request found!");
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const addNationWithId = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    return res
      .status(403)
      .end("POST operation not supported on /nations/" + req.params.nationId);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const updateNation = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    if (updateNation) {
      const updatedNation = await updateNationById(
        req.params.nationId,
        req.body
      );
      return res.status(200).json(updatedNation);
    } else return res.sendStatus(403).end("No request found!");
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const deleteNation = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    await deleteNationById(req.params.nationId);
    return res.redirect("/nations");
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
