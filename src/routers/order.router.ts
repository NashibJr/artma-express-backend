import { Router } from "express";
import OrderController from "../controllers/order.controller";

const OrderRouter = Router();

OrderRouter.post("/", OrderController.create);
OrderRouter.get("/", OrderController.getOrders);
OrderRouter.put("/:id", OrderController.update);

export default OrderRouter;
