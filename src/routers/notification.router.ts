import { Router } from "express";
import NotificationController from "../controllers/notification.controller";
import isAuthenticated from "../middlewares/isAuthenticated";

const NotificationRouter = Router();

NotificationRouter.post("/", isAuthenticated, NotificationController.create);
NotificationRouter.get("/", isAuthenticated, NotificationController.getAll);
NotificationRouter.put(
  "/:id",
  isAuthenticated,
  NotificationController.markAsRead
);

export default NotificationRouter;
