import express from "express";

import { isAuthenticated, isOwner } from "../middlewares";
import {
  addComment,
  deleteComment,
  getAllComments,
  getCommentWithId,
  updateComment,
} from "../controllers/comments";

export default (router: express.Router) => {
  router.get("/orchidDetail/:slug/comments", isAuthenticated, getAllComments);
  router.get(
    "/orchidDetail/:slug/comments/:commentId",
    isAuthenticated,
    getCommentWithId
  );
  router.post("/orchidDetail/:slug/comments", isAuthenticated, addComment);
  router.put(
    "/orchidDetail/:slug/comments/:commentId",
    isAuthenticated,
    updateComment
  );
  router.delete(
    "/orchidDetail/:slug/comments/:commentId",
    isAuthenticated,
    deleteComment
  );
};
