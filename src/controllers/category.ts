import express from "express";
import {
  createCategory,
  deleteCategoryById,
  deleteOldestCategory,
  getCategories,
  getCategoryById,
  getCategoryByName,
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
    const existingCategory = await getCategoryByName(req.body.name);

    if (existingCategory) {
      return res.status(400).json({ message: "Category name must be unique" });
    }

    const newCategory = await createCategory(req.body);

    if (newCategory) {
      return res.status(200).json(newCategory);
    } else {
      return res.status(403).end("No request found!");
    }
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
    const deletedOldestCategory = await deleteOldestCategory();
    if (!deletedOldestCategory) return res.status(404).end("No orchids found!");
    return res.status(403).end("Deleting the oldest Category");
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
    const Category = await getCategoryById(req.params.categoryId);

    if (Category) {
      return res.status(200).json(Category);
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
        "POST operation not supported on /category/" + req.params.categoryId
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
    const updatedCategory = await updateCategoryById(
      req.params.categoryId,
      req.body
    );
    if (updatedCategory) {
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
    await deleteCategoryById(req.params.categoryId);
    return res
      .status(200)
      .end(`Delete category with ID: ${req.params.categoryId}`);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
