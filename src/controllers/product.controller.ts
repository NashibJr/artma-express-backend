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
    resp.sendFile(`${process.cwd()}/src/profile-images/${req.params.image}`);
  },
  getProducts: async (
    req: Request,
    resp: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data = await ProductServices.getProducts();

      resp.status(200).json(data);
    } catch (error) {
      resp.status(400).json({
        error: (error as Error).message,
      });
    }
  },
  deleteProduct: async (
    req: Request,
    resp: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const {
        params: { id },
      } = req;
      const data = await ProductServices.deleteProduct(id);

      resp.status(202).json(data);
    } catch (error) {
      resp.status(400).json({
        error: (error as Error).message,
      });
    }
  },
  update: async (
    req: Request,
    resp: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const {
        body,
        params: { id },
      } = req;
      const files = req.files as {
        [field: string]: Express.Multer.File[];
      };
      const data = await ProductServices.update(
        body,
        id,
        files?.featuredImage && files?.featuredImage[0]?.filename,
        files?.images && Array.from(files?.images, (item) => item?.filename)
      );

      resp.status(202).json(data);
    } catch (error) {
      resp.status(400).json({
        error: (error as Error).message,
      });
    }
  },
  getSingleProduct: async (
    req: Request,
    resp: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const {
        params: { id },
      } = req;
      const data = await ProductServices.getSingleProduct(id);

      resp.status(200).json(data);
    } catch (error) {
      resp.status(400).json({
        error: (error as Error).message,
      });
    }
  },
  productCategories: async (
    req: Request,
    resp: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data = await ProductServices.categoryProducts(req.params.id);

      resp.status(200).json(data);
    } catch (error) {
      resp.status(400).json({
        error: (error as Error).message,
      });
    }
  },
};

export default ProductController;
