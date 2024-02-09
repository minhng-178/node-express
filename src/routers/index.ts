import express from "express";

import category from "./category";
import orchids from "./orchids";
import authentication from "./authentication";
import users from "./users";

const router = express.Router();

export default (): express.Router => {
  category(router);
  orchids(router);
  users(router);
  authentication(router);

  return router;
};
