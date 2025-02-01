import { Router } from "express";
import NotificationController from "../controllers/notification.controller";

const NotificationRouter = Router();

NotificationRouter.post("/", NotificationController.create);
NotificationRouter.get("/", NotificationController.getAll);
NotificationRouter.put("/:id", NotificationController.markAsRead);

export default NotificationRouter;
