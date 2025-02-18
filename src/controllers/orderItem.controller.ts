import { NextFunction, Request, Response } from "express";
import OrderItemServices from "../services/orderItem.services";

const OrderItemController = {
  create: async (
    req: Request,
    resp: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data = await OrderItemServices.create(req.body);

      resp.status(201).json(data);
    } catch (error) {
      resp.status(400).json({
        error: (error as Error).message,
      });
    }
  },
};

export default OrderItemController;
