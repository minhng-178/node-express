import express from "express";
import { createComment, getComments } from "../models/comments";

export const getAllComments = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const comments = await getComments();
    return res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const addComment = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const newComment = await createComment(req.body);

    if (newComment) {
      return res.status(200).json(newComment);
    } else {
      return res.status(403).end("No request found!");
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
