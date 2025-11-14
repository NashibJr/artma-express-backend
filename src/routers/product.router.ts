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
  { name: "images", maxCount: 5 },
]);

ProductRouter.post(
  "/create",
  isAuthenticated,
  (req: Request, resp: Response, next: NextFunction) =>
    canUploadProduct(req, resp, next)(req.body.uploader),
  async (req: Request, res: Response, next: NextFunction) => {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            error: "File is too large. Max size is 2MB.",
          });
        }

        return res.status(400).json({
          error: err.message,
        });
      } else if (err) {
        return res.status(500).json({
          error: "Something went wrong while uploading the file.",
        });
      }

      next();
    });
  },

  ProductController.create
);
ProductRouter.get("/download/:image", ProductController.download);
ProductRouter.get("/all", ProductController.getProducts);
ProductRouter.delete(
  "/delete/:id",
  isAuthenticated,
  ProductController.deleteProduct
);
ProductRouter.put(
  "/update/:id",
  isAuthenticated,
  upload,
  ProductController.update
);
ProductRouter.get("/:id", ProductController.getSingleProduct);
ProductRouter.get("/category/:id", ProductController.productCategories);

export default ProductRouter;
