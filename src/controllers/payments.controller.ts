import axios from "axios";
import { NextFunction, Request, Response } from "express";
import { nanoid } from "nanoid";
import {
  OrderRequestProps,
  PaymentRequestProps,
  PaymentStatusTypes,
  RegisterIPNProps,
  RequestTokenProps,
} from "../types/payment.types";

const PaymentController = {
  notification: async (
    req: Request,
    resp: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { params } = req;
      console.log(params, ">>>>");
      resp.status(200).json({
        message: "I have the params",
      });
    } catch (error) {
      resp.status(400).json({
        error: (error as Error).message,
      });
    }
  },
  makePayment: async (
    req: Request,
    resp: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // get token
      const response = await axios.post<RequestTokenProps>(
        "https://pay.pesapal.com/v3/api/Auth/RequestToken",
        {
          consumer_key: process.env.PESAPAL_CONSUMER_KEY,
          consumer_secret: process.env.PESAPAL_CONSUMER_SECRET,
        }
      );
      const { error, token, expiryDate } = response.data;
      if (error) {
        resp.status(400).json({
          error: error,
        });

        return;
      }

      // register IPN
      const ipnResponse = await axios.post<RegisterIPNProps>(
        "https://pay.pesapal.com/v3/api/URLSetup/RegisterIPN",
        {
          url: "http://localhost:1010/api/v1/payments/ipn",
          ipn_notification_type: "GET",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const ipnResponseData = ipnResponse.data;
      if (ipnResponseData.error) {
        resp.status(400).json({ error: ipnResponseData.error?.message });

        return;
      }

      // make the order request
      const orderRequest = await axios.post<OrderRequestProps>(
        "https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest",
        {
          amount: req.body.amount,
          callback_url: "https://github.com",
          currency: "UGX",
          description: "Payment for Artma express",
          id: nanoid(20),
          notification_id: ipnResponseData.ipn_id,
          billing_address: {
            phone_number: req.body.phone,
          },
        } as PaymentRequestProps,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const orderRequestData = orderRequest.data;
      if (orderRequestData.error) {
        resp.status(400).json({ error: orderRequestData.error?.message });

        return;
      }

      resp.status(200).json({
        url: orderRequestData.redirect_url,
        trackingId: orderRequestData.order_tracking_id,
        token,
        expiryDate,
      });
    } catch (error) {
      resp.status(400).json({
        error: (error as Error)?.message,
      });
    }
  },
  checkPaymentStatus: async (
    req: Request,
    resp: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { trackingId, token } = req.params;
      console.log(token);

      const response = await axios.get<PaymentStatusTypes>(
        `https://pay.pesapal.com/v3/api/Transactions/GetTransactionStatus?orderTrackingId=${trackingId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const { error, payment_status_description } = response.data;
      if (error) {
        resp.status(400).json({
          error: error.message,
        });

        return;
      }

      resp.status(200).json({
        payment_status_description,
      });
    } catch (error) {
      console.log(error);

      resp.status(400).json({
        error: (error as Error)?.message,
      });
    }
  },
};

export default PaymentController;
