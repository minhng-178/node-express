import express from "express";
import nations from "./nations";

const router = express.Router();

export default (): express.Router => {
  nations(router);
  return router;
};
