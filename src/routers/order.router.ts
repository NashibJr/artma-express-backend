import { Router } from "express";
import OrderController from "../controllers/order.controller";
import handleDeliverer from "../middlewares/update.deliverer";

const OrderRouter = Router();

OrderRouter.post("/", OrderController.create);
OrderRouter.get("/", OrderController.getOrders);
OrderRouter.put("/:id", handleDeliverer, OrderController.update);
OrderRouter.delete("/:id", OrderController.deleteOrder);
OrderRouter.get("/:id", OrderController.getSingleOrder);

export default OrderRouter;
