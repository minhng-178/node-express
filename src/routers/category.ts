import express from "express";
import {
  addCategory,
  addCategoryWithId,
  deleteCategories,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategories,
  updateCategory,
} from "../controllers/category";

export default (router: express.Router) => {
  router.get("/categories", getAllCategories);
  router.post("/categories", addCategory);
  router.put("/categories", updateCategories);
  router.delete("/categories", deleteCategories);
  router.get("/categories/:categoryId", getCategory);
  router.post("/categories/:categoryId", addCategoryWithId);
  router.put("/categories/:categoryId", updateCategory);
  router.delete("/categories/:categoryId", deleteCategory);
};
