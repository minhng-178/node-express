import express from "express";

import nations from "./nations";
import players from "./players";
import category from "./category";
import orchids from "./orchids";

const router = express.Router();

export default (): express.Router => {
  nations(router);
  players(router);
  category(router);
  orchids(router);
  return router;
};
