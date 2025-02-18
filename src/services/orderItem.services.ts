import OrderItem from "../models/orderItem.model";
import { OrderItemTypes } from "../types/order.types";

const OrderItemServices = {
  create: async (data: OrderItemTypes) => {
    try {
      const { quantity, unitPrice } = data;
      const orderItem = await OrderItem.create({
        ...data,
        totalPrice: quantity * unitPrice,
      });

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
