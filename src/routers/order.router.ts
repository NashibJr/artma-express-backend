import { Router } from "express";
import OrderController from "../controllers/order.controller";
import handleDeliverer from "../middlewares/update.deliverer";
import isAuthenticated from "../middlewares/isAuthenticated";

const OrderRouter = Router();

OrderRouter.post("/", isAuthenticated, OrderController.create);
OrderRouter.get("/", isAuthenticated, OrderController.getOrders);
OrderRouter.put(
  "/:id",
  isAuthenticated,
  handleDeliverer,
  OrderController.assignDeliverer
);
OrderRouter.delete("/:id", isAuthenticated, OrderController.deleteOrder);
OrderRouter.get("/:id", isAuthenticated, OrderController.getSingleOrder);
OrderRouter.put("/status/:id", isAuthenticated, OrderController.changeStatus);

export default OrderRouter;
