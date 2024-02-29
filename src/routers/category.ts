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
import { isAdmin, isAuthenticated } from "../middlewares";

export default (router: express.Router) => {
  router.get("/categories", isAuthenticated, isAdmin, getAllCategories);
  router.post("/categories", isAuthenticated, isAdmin, addCategory);
  router.put("/categories", isAuthenticated, isAdmin, updateCategories);
  router.delete("/categories", isAuthenticated, isAdmin, deleteCategories);
  router.get("/categories/:categoryId", isAuthenticated, isAdmin, getCategory);
  router.post(
    "/dashboard/categories/:categoryId",
    isAuthenticated,
    isAdmin,
    addCategoryWithId
  );
  router.put(
    "/dashboard/categories/:categoryId",
    isAuthenticated,
    isAdmin,
    updateCategory
  );
  router.delete(
    "/dashboard/categories/:categoryId",
    isAuthenticated,
    isAdmin,
    deleteCategory
  );
};
