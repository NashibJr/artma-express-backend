import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";

const canUploadProduct =
  (req: Request, resp: Response, next: NextFunction) => async (id: string) => {
    try {
      const uploader = await User.findById(id);
      if (uploader?.role === "customer" || uploader?.role === "deliverer") {
        resp.status(401).json({
          error: "You are not authorized to perform this action",
        });
      } else {
        next();
      }
    } catch (error) {
      resp.status(400).json({
        error: (error as Error).message,
      });
    }
  };

export default canUploadProduct;
