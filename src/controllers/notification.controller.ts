import { NextFunction, Request, Response } from "express";
import NotificationServices from "../services/notification.services";

const NotificationController = {
  create: async (
    req: Request,
    resp: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { body } = req;
      const data = await NotificationServices.create(body);

      resp.status(201).json(data);
    } catch (error) {
      resp.status(400).json({
        error: (error as Error).message,
      });
    }
  },
  getAll: async (
    req: Request,
    resp: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data = await NotificationServices.getAllNotifications();

      resp.status(200).json(data);
    } catch (error) {
      resp.status(400).json({
        error: (error as Error).message,
      });
    }
  },
  markAsRead: async (
    req: Request,
    resp: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data = await NotificationServices.markAsRead(req.params.id);

      resp.status(202).json(data);
    } catch (error) {
      resp.status(400).json({
        error: (error as Error).message,
      });
    }
  },
};

export default NotificationController;
