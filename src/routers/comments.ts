import express from "express";

import { isAuthenticated } from "../middlewares";
import { addComment, getAllComments } from "../controllers/comments";

export default (router: express.Router) => {
  router.get("/comments", isAuthenticated, getAllComments);
  router.post("/comments", isAuthenticated, addComment);
};
