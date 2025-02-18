import { Router } from "express";
import OrderItemController from "../controllers/orderItem.controller";
import isAuthenticated from "../middlewares/isAuthenticated";

const OrderItemRouter = Router();

OrderItemRouter.post("/", isAuthenticated, OrderItemController.create);

export default OrderItemRouter;
