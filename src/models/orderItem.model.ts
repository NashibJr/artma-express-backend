import { model, Schema } from "mongoose";
import { OrderItemTypes } from "../types/order.types";

const orderItemSchema = new Schema<OrderItemTypes>(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
const OrderItem = model<OrderItemTypes>("orderItem", orderItemSchema);

export default OrderItem;
