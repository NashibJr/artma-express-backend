import OrderItem from "../models/orderItem.model";
import { OrderItemTypes } from "../types/order.types";

const OrderItemServices = {
  create: async (data: OrderItemTypes) => {
    try {
      const orderItem = await OrderItem.create(data);

      return {
        ...orderItem.toJSON(),
        message: "Order item successfully created",
      };
    } catch (error) {
      return {
        error: (error as Error).message,
      };
    }
  },
};

export default OrderItemServices;
