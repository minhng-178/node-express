import express from "express";

import {
  createOrchid,
  deleteOldestOrchid,
  deleteOrchidById,
  getOrchidById,
  getOrchidBySlug,
  getOrchids,
  updateOrchidById,
} from "../models/orchids";

export const originalData = [
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
    const orchid = await getOrchidById(req.params.orchidId);
    if (!orchids) {
      res.sendStatus(404);
    }

    return res.render("pages/orchids", {
      orchids: orchids,
      orchid: orchid,
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
      res.status(201).json(newOrchid);
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
    const deletedOldestOrchids = await deleteOldestOrchid();
    if (!deletedOldestOrchids) return res.status(404).end("No orchids found!");
    res.status(200).end("Deleted oldest version of orchids");
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
    const orchid = await getOrchidById(req.params.orchidId);
    const orchids = await getOrchids();

    if (orchid) {
      res.render("pages/orchid", {
        orchid: orchid,
        orchids: orchids,
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
    console.log("test123");

    const updatedOrchid = await updateOrchidById(req.params.orchidId, req.body);

    if (updatedOrchid) {
      res.status(200).json(updatedOrchid);
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

export const createFormOrchid = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    res.render("pages/orchidForm", { originalList: originalData });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
