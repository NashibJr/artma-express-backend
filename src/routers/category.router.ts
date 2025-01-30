import { Router } from "express";
import CategoryController from "../controllers/category.controller";
import multer from "multer";
import storage from "../middlewares/upload.middleware";

const CategoryRouter = Router();

const upload = multer({
  storage,
  limits: { fileSize: 2000000 },
}).single("categoryImage");

CategoryRouter.post("/", upload, CategoryController.create);
CategoryRouter.get("/download/:image", CategoryController.download);

export default CategoryRouter;
