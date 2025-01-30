import { Router } from "express";
import OrderController from "../controllers/order.controller";

const OrderRouter = Router();

OrderRouter.post("/", OrderController.create);

export default OrderRouter;
