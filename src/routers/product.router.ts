import { NextFunction, Request, Response, Router } from "express";
import ProductController from "../controllers/product.controller";
import multer from "multer";
import storage from "../middlewares/upload.middleware";
import canUploadProduct from "../middlewares/canUploadProduct.middleware";
import isAuthenticated from "../middlewares/isAuthenticated";

const ProductRouter = Router();

const upload = multer({
  storage,
  limits: { fileSize: 2000000 },
}).fields([
  { name: "featuredImage", maxCount: 1 },
  { name: "images", maxCount: 1000 },
]);

ProductRouter.post(
  "/create",
  upload,
  (req: Request, resp: Response, next: NextFunction) =>
    canUploadProduct(req, resp, next)(req.body.uploader),
  isAuthenticated,
  ProductController.create
);
ProductRouter.get(
  "/download/:image",
  isAuthenticated,
  ProductController.download
);
ProductRouter.get("/all", isAuthenticated, ProductController.getProducts);
ProductRouter.delete(
  "/delete/:id",
  isAuthenticated,
  ProductController.deleteProduct
);
ProductRouter.put("/update/:id", isAuthenticated, ProductController.update);
ProductRouter.get("/:id", isAuthenticated, ProductController.getSingleProduct);

export default ProductRouter;
