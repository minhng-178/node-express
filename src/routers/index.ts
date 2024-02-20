import express from "express";

import users from "./users";
import global from "./global";
import orchids from "./orchids";
import category from "./category";
import authentication from "./authentication";

const router = express.Router();

export default (): express.Router => {
  global(router);
  category(router);
  orchids(router);
  users(router);
  authentication(router);

  return router;
};
