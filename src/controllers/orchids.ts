import express from "express";

import {
  createOrchid,
  deleteOldestOrchid,
  deleteOrchidById,
  getOrchidById,
  getOrchidByName,
  getOrchids,
  getTotalPages,
  updateOrchidById,
} from "../models/orchids";
import { getCategories } from "../models/category";

export const originalData = [
  { id: "1", name: "Viet Nam" },
  { id: "2", name: "Thailand" },
  { id: "3", name: "Laos" },
  { id: "4", name: "China" },
  { id: "5", name: "Japan" },
  { id: "6", name: "UAE" },
  { id: "7", name: "Korea" },
  { id: "8", name: "HongKong" },
  { id: "9", name: "Indonesia" },
  { id: "10", name: "Colombia" },
  { id: "11", name: "Ecuador" },
  { id: "12", name: "New Guinea" },
  { id: "13", name: "Brazil" },
  { id: "14", name: "Peru" },
  { id: "15", name: "Borneo" },
  { id: "16", name: "India" },
  { id: "17", name: "Singapore" },
  { id: "18", name: "Costa Rica" },
];

export const getAllOrchids = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const name = (req.query.name as string) || "";

    const totalPages = await getTotalPages();
    const orchids = await getOrchids(page, name);
    const orchid = await getOrchidById(req.params.orchidId);

    if (!orchids) {
      res.sendStatus(404);
    }

    return res.render("pages/orchids", {
      orchids: orchids,
      orchid: orchid,
      originalList: originalData,
      page: page,
      totalPages: totalPages,
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
    const existingOrchid = await getOrchidByName(req.body.name);

    if (existingOrchid) {
      return res.sendStatus(400);
    }

    const newOrchid = await createOrchid(req.body);

    if (newOrchid) {
      res.status(201).json(newOrchid);
    } else {
      return res.status(403).end("No request found!");
    }
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
    const categories = await getCategories();

    if (orchid) {
      res.render("pages/orchid", {
        orchid: orchid,
        categoriesList: categories,
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
    const duplicateOrchid = await getOrchidByName(req.body.name);
    if (duplicateOrchid && duplicateOrchid._id != req.params.orchidId) {
      return res.status(400).end("Duplicate name found!");
    }

    const updatedOrchid = await updateOrchidById(req.params.orchidId, req.body);

    if (updatedOrchid) {
      return res.status(200).json(updatedOrchid);
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

    const page = parseInt(req.query.page as string) || 1;

    const orchids = await getOrchids(page);
    const totalPages = await getTotalPages();

    const orchid = await getOrchidById(req.params.orchidId);
    if (!orchids) {
      res.sendStatus(404);
    }
    return res.render("pages/orchids", {
      orchids: orchids,
      orchid: orchid,
      originalList: originalData,
      page: page,
      totalPages: totalPages,
    });
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
  const categories = await getCategories();
  try {
    res.render("pages/orchidForm", {
      originalList: originalData,
      categoriesList: categories,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
