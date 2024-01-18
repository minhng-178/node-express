import express from "express";
import {
  createCategory,
  deleteCategoryById,
  getCategories,
  getCategoryById,
  updateCategoryById,
} from "../models/category";

export const getAllCategories = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const Category = await getCategories();
    return res.status(200).json(Category);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const addCategory = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const newCategory = await createCategory(req.body);
    if (newCategory) {
      return res.status(200).json(newCategory);
    } else return res.sendStatus(403).end("No request found!");
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const updateCategories = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    return res.status(403).end("PUT operation not supported on /Category");
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const deleteCategories = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    return res.status(403).end("Deleting all Category");
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const getCategory = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const Category = await getCategoryById(req.params.CategoryId);

    if (Category) {
      return res
        .status(200)
        .end(`Get category by ID: ${req.params.CategoryId}`);
    } else return res.sendStatus(403).end("No request found!");
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const addCategoryWithId = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    return res
      .status(403)
      .end(
        "POST operation not supported on /Category/" + req.params.CategoryId
      );
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const updateCategory = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    if (updateCategory) {
      const updatedCategory = await updateCategoryById(
        req.params.CategoryId,
        req.body
      );
      return res.status(200).json(updatedCategory);
    } else return res.sendStatus(403).end("No request found!");
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const deleteCategory = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    await deleteCategoryById(req.params.CategoryId);
    return res
      .sendStatus(200)
      .end(`Delete category with ID: ${req.params.CategoryId}`);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
