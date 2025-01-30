import { NextFunction, Request, Response } from "express";
import ProductServices from "../services/product.services";

const ProductController = {
  create: async (
    req: Request,
    resp: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const files = req.files as {
        [field: string]: Express.Multer.File[];
      };
      const data = await ProductServices.createProduct(
        req.body,
        files?.featuredImage && files?.featuredImage[0]?.filename,
        files?.images && Array.from(files?.images, (item) => item?.filename)
      );

      resp.status(201).json(data);
    } catch (error) {
      resp.status(400).json({
        error: (error as Error).message,
      });
    }
  },
  download: (req: Request, resp: Response, next: NextFunction) => {
    resp.download(`${process.cwd()}/src/profile-images/${req.params.image}`);
  },
};

export default ProductController;
