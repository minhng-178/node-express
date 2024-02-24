import express from "express";
import {
  createComment,
  deleteCommentById,
  getCommentById,
  getComments,
  updateCommentById,
} from "../models/comments";

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
    const { slug } = req.params;
    const { ...commentData } = req.body;

    const newComment = await createComment(commentData, slug);

    if (newComment) {
      return res.status(200).json(newComment);
    } else {
      return res.status(403).end("No request found!");
    }
  } catch (error) {
    console.log(error);
    if (error.message.includes("E11000")) {
      return res.status(400).send("Duplicate comment not allowed.");
    }
    return res.sendStatus(500);
  }
};

export const updateComment = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { commentId } = req.params;
    const { ...commentData } = req.body;
    const updatedComment = await updateCommentById(commentId, commentData);

    if (updatedComment) {
      return res.status(200).json(updatedComment);
    } else {
      return res.status(404).end("No comment found with this ID!");
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const getCommentWithId = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { commentId } = req.params;
    const comment = await getCommentById(commentId);

    if (comment) {
      return res.status(200).json(comment);
    } else {
      return res.status(404).end("No comment found with this ID!");
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const deleteComment = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { commentId } = req.params;
    const deletedComment = await deleteCommentById(commentId);

    if (deletedComment) {
      return res.status(200).json(deletedComment);
    } else {
      return res.status(404).end("No comment found with this ID!");
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
