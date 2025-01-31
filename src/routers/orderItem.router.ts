import { Router } from "express";
import OrderItemController from "../controllers/orderItem.controller";

const OrderItemRouter = Router();

OrderItemRouter.post("/", OrderItemController.create);

export default OrderItemRouter;
