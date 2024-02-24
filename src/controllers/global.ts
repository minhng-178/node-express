import moment from "moment";
import express from "express";

import { originalData } from "./orchids";
import { getCategories } from "../models/category";
import { getOrchidBySlug, getOrchids, getTotalPages } from "../models/orchids";

export const getHomePage = async (
  req: express.Request,
  res: express.Response
) => {
  const page = parseInt(req.query.page as string) || 1;

  const totalPages = await getTotalPages();
  let orchids = await getOrchids(page);

  if (!orchids) {
    res.sendStatus(404);
  }

  orchids = orchids.map((orchid) => {
    let totalComments = 0;
    let totalRating = 0;
    if (orchid.comments) {
      totalComments = orchid.comments.length;
      totalRating = orchid.comments.reduce(
        (total, comment) => total + comment.rating,
        0
      );
    }

    let averageRating =
      totalComments > 0 ? Math.ceil(totalRating / totalComments) : 0;

    return {
      ...orchid.toObject(),
      totalComments,
      averageRating,
    };
  });

  res.render("pages/home", {
    orchids: orchids,
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

export const getError404Page = async (
  req: express.Request,
  res: express.Response
) => {
  res.render("pages/404");
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
    let totalComments = 0;
    let totalRating = 0;
    if (orchid.comments) {
      totalComments = orchid.comments.length;
      totalRating = orchid.comments.reduce(
        (total, comment) => total + comment.rating,
        0
      );
    }

    let averageRating =
      totalComments > 0 ? Math.ceil(totalRating / totalComments) : 0;

    console.log(orchid.comments);

    res.render("pages/orchidDetail", {
      orchid: orchid,
      moment: moment,
      categoriesList: categories,
      originalList: originalData,
      totalComments: totalComments,
      averageRating: averageRating,
    });
  } else return res.status(403).end("No request found!");
};
