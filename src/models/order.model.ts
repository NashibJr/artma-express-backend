import { model, Schema } from "mongoose";
import { OrderTypes } from "../types/order.types";

const orderSchema = new Schema<OrderTypes>(
  {
    address: {
      type: String,
      required: false,
    },
    amount: {
      type: String,
      required: true,
    },
    customer: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    deliverer: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    shipped: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Order = model<OrderTypes>("Order", orderSchema);

export default Order;
