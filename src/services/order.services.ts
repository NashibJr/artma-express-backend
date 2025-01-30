import Order from "../models/order.model";
import { OrderTypes } from "../types/order.types";

const OrderServices = {
  createOrder: async (orderData: OrderTypes) => {
    try {
      const order = await Order.create(orderData);

      return {
        ...order.toJSON(),
        message: "Order successfully placed",
      };
    } catch (error) {
      return {
        error: (error as Error).message,
      };
    }
  },
};

export default OrderServices;
