import { model, Schema } from "mongoose";
import { OrderItemTypes } from "../types/order.types";

const orderItemSchema = new Schema<OrderItemTypes>({
  product: {
    type: Schema.Types.ObjectId,
    ref: "",
  },
});
