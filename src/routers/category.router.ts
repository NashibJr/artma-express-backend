import { Router } from "express";
import CategoryController from "../controllers/category.controller";
import multer from "multer";
import storage from "../middlewares/upload.middleware";
import isAuthenticated from "../middlewares/isAuthenticated";

const CategoryRouter = Router();

const upload = multer({
  storage,
  limits: { fileSize: 2000000 },
}).single("categoryImage");

CategoryRouter.post("/", isAuthenticated, upload, CategoryController.create);
CategoryRouter.get(
  "/download/:image",
  isAuthenticated,
  CategoryController.download
);
CategoryRouter.get("/", isAuthenticated, CategoryController.getCategories);
CategoryRouter.delete(
  "/:id",
  isAuthenticated,
  CategoryController.deleteCategory
);

export default CategoryRouter;
