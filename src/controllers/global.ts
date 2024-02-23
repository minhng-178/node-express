import moment from "moment";
import express from "express";
import { originalData } from "./orchids";
import {
  getOrchidById,
  getOrchidBySlug,
  getOrchids,
  getTotalPages,
} from "../models/orchids";
import { getCategories } from "../models/category";

export const getHomePage = async (
  req: express.Request,
  res: express.Response
) => {
  const page = parseInt(req.query.page as string) || 1;

  const totalPages = await getTotalPages();
  const orchids = await getOrchids(page);
  const orchid = await getOrchidById(req.params.orchidId);

  if (!orchids) {
    res.sendStatus(404);
  }
  res.render("pages/home", {
    orchids: orchids,
    orchid: orchid,
    originalList: originalData,
    page: page,
    totalPages: totalPages,
  });
};

export const getAboutPage = async (
  req: express.Request,
  res: express.Response
) => {
  res.render("pages/about");
};

export const getLoginPage = async (
  req: express.Request,
  res: express.Response
) => {
  res.render("pages/login");
};

export const getRegisterPage = async (
  req: express.Request,
  res: express.Response
) => {
  res.render("pages/register");
};

export const getOrchidDetailPage = async (
  req: express.Request,
  res: express.Response
) => {
  const orchid = await getOrchidBySlug(req.params.slug);
  const categories = await getCategories();

  if (orchid) {
    res.render("pages/orchidDetail", {
      orchid: orchid,
      moment: moment,
      categoriesList: categories,
      originalList: originalData,
    });
  } else return res.status(403).end("No request found!");
};
