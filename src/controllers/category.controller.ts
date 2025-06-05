import { NextFunction, Request, Response } from "express";
import CategoryServices from "../services/category.services";

const CategoryController = {
  create: async (
    req: Request,
    resp: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { body, file } = req;
      const data = await CategoryServices.create(body, file?.filename!);

      resp.status(201).json(data);
    } catch (error) {
      resp.status(400).json({
        error: (error as Error).message,
      });
    }
  },
  download: async (req: Request, resp: Response, next: NextFunction) => {
    const {
      params: { image },
    } = req;
    resp.sendFile(`${process.cwd()}/src/profile-images/${image}`);
  },
  getCategories: async (
    req: Request,
    resp: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data = await CategoryServices.getCategories();

      resp.status(200).json(data);
    } catch (error) {
      resp.status(400).json({
        error: (error as Error).message,
      });
    }
  },
  deleteCategory: async (
    req: Request,
    resp: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const {
        params: { id },
      } = req;
      const data = await CategoryServices.deleteCategory(id);

      resp.status(200).json(data);
    } catch (error) {
      resp.status(400).json({
        error: (error as Error).message,
      });
    }
  },
  singleCategory: async (
    req: Request,
    resp: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const {
        params: { id },
      } = req;
      const data = await CategoryServices.singleCategory(id);

      resp.status(200).json(data);
    } catch (error) {
      resp.status(400).json({
        error: (error as Error).message,
      });
    }
  },
};

export default CategoryController;
