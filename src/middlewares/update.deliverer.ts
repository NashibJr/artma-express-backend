import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";

const handleDeliverer = async (
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<any> => {
  try {
    if (req.body.deliverer) {
      const user = await User.findById(req.body.deliverer);
      if (!user) {
        return resp.status(404).json({ error: "User not found" });
      }

      if (user.role !== "deliverer") {
        return resp
          .status(406)
          .json({ error: "Only deliverers can be assigned to this task" });
      }

      next();
    } else {
      next();
    }
  } catch (error) {
    return resp.status(400).json({
      error: (error as Error).message,
    });
  }
};

export default handleDeliverer;
