import express from "express";

export const getNations = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    return res.status(200).end("Will send all the nations to you!");
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const addNation = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    return res
      .status(200)
      .end(
        "Will add the nation: " +
          req.body.name +
          " with details: " +
          req.body.description
      );
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const updateNations = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    return res.status(403).end("PUT operation not supported on /nations");
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const deleteNations = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    return res.status(403).end("Deleting all nations");
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const getNation = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    return res
      .status(200)
      .end(
        "Will send details of the nation: " + req.params.nationId + " to you!"
      );
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const addNationWithId = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    return res
      .status(403)
      .end("POST operation not supported on /nations/" + req.params.nationId);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const updateNation = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    res.write("Updating the nation: " + req.params.nationId + "\n");
    return res
      .status(200)
      .end(
        "Will update the nation: " +
          req.body.name +
          " with details: " +
          req.body.description
      );
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const deleteNation = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    return res.status(200).end("Deleting nation: " + req.params.nationId);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
