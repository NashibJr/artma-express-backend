import { Router } from "express";
import ProductController from "../controllers/product.controller";
import multer from "multer";
import storage from "../middlewares/upload.middleware";

const ProductRouter = Router();

const upload = multer({
  storage,
  limits: { fileSize: 2000000 },
}).fields([
  { name: "featuredImage", maxCount: 1 },
  { name: "images", maxCount: 1000 },
]);

ProductRouter.post("/create", upload, ProductController.create);
ProductRouter.get("/download/:image", ProductController.download);
ProductRouter.get("/all", ProductController.getProducts);
ProductRouter.delete("/delete/:id", ProductController.deleteProduct);
ProductRouter.put("/update/:id", ProductController.update);

export default ProductRouter;
