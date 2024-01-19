import express from "express";

import {
  createOrchid,
  deleteOrchidById,
  getOrchidById,
  getOrchids,
  updateOrchidById,
} from "../models/orchids";

const originalData = [
  { id: "1", name: "Viet Nam" },
  { id: "2", name: "Thailand" },
  { id: "3", name: "Laos" },
  { id: "4", name: "China" },
  { id: "5", name: "Japan" },
  { id: "6", name: "UAE" },
  { id: "7", name: "Korea" },
  { id: "8", name: "HongKong" },
];

export const getAllOrchids = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const orchids = await getOrchids();
    return res.render("pages/orchids", {
      orchids: orchids,
      originalList: originalData,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const addOrchid = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const newOrchid = await createOrchid(req.body);

    if (newOrchid) {
      res.redirect("/orchids");
    } else return res.status(403).end("No request found!");
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const updateOrchids = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    return res.status(403).end("PUT operation not supported on /orchids");
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const deleteOrchids = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    return res.status(403).end("Deleting all orchids");
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const getOrchid = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const Orchid = await getOrchidById(req.params.OrchidId);
    const Orchids = await getOrchids();
    if (Orchid) {
      res.render("pages/Orchid", {
        Orchid: Orchid,
        Orchids: Orchids,
        originalList: originalData,
      });
    } else return res.status(403).end("No request found!");
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const addOrchidWithId = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    return res
      .status(403)
      .end("POST operation not supported on /orchids/" + req.params.orchidId);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const updateOrchid = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const updatedOrchid = await updateOrchidById(req.params.orchidId, req.body);

    if (updatedOrchid) {
      res.redirect(`/orchids/${req.params.orchidId}`);
    } else return res.status(403).end("No request found!");
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const deleteOrchid = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    await deleteOrchidById(req.params.orchidId);
    return res.redirect("/Orchids");
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
