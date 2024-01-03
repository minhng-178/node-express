import express from "express";

import nations from "./nations";
import players from "./players";

const router = express.Router();

export default (): express.Router => {
  nations(router);
  players(router);
  return router;
};
