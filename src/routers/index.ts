import express from "express";

import users from "./users";
import global from "./global";
import orchids from "./orchids";
import category from "./category";
import authentication from "./authentication";
import comments from "./comments";

const router = express.Router();

export default (): express.Router => {
  global(router);
  category(router);
  orchids(router);
  users(router);
  comments(router);
  authentication(router);

  return router;
};
