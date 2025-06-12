import { NextFunction, Request, Response } from "express";
import OrderServices from "../services/order.services";

const OrderController = {
  create: async (
    req: Request,
    resp: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data = await OrderServices.createOrder(req.body);

      resp.status(201).json(data);
    } catch (error) {
      resp.status(400).json({
        error: (error as Error).message,
      });
    }
  },
  getOrders: async (
    req: Request,
    resp: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data = await OrderServices.getOrders();

      resp.status(200).json(data);
    } catch (error) {
      resp.status(400).json({
        error: (error as Error).message,
      });
    }
  },
  assignDeliverer: async (
    req: Request,
    resp: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const {
        params: { id },
        body,
      } = req;
      const data = await OrderServices.assignDeliverer(body, id);

      resp.status(202).json(data);
    } catch (error) {
      resp.status(400).json({
        error: (error as Error).message,
      });
    }
  },
  deleteOrder: async (
    req: Request,
    resp: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const {
        params: { id },
      } = req;
      const data = await OrderServices.deleteOrder(id);

      resp.status(202).json(data);
    } catch (error) {
      resp.status(400).json({
        error: (error as Error).message,
      });
    }
  },
  getSingleOrder: async (
    req: Request,
    resp: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const {
        params: { id },
      } = req;
      const data = await OrderServices.getSingleOrder(id);

      resp.status(200).json(data);
    } catch (error) {
      resp.status(400).json({
        error: (error as Error).message,
      });
    }
  },
  changeStatus: async (
    req: Request,
    resp: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data = await OrderServices.changeStatus(req.params.id, req.body);

      resp.status(202).json(data);
    } catch (error) {
      resp.status(400).json({
        error: (error as Error).message,
      });
    }
  },
  getUserOrders: async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data = await OrderServices.getUserOrders(request.params.id);
      response.status(200).json(data);
    } catch (error) {
      response.status(400).json({ error: (error as Error).message });
    }
  },
};

export default OrderController;
