import { Router } from "express";
import PaymentController from "../controllers/payments.controller";

const PaymentRouter = Router();

PaymentRouter.get("/ipn", PaymentController.notification);
PaymentRouter.post("/make", PaymentController.makePayment);
PaymentRouter.get(
  "/check-status/:trackingId/:token",
  PaymentController.checkPaymentStatus
);

export default PaymentRouter;
