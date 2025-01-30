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
  getOrders: async () => {
    try {
      return await Order.find({});
    } catch (error) {
      return {
        error: (error as Error).message,
      };
    }
  },
  update: async (data: OrderTypes, orderId: string) => {
    try {
      await Order.findByIdAndUpdate(orderId, data);

      return {
        message: "Order successfully updated",
      };
    } catch (error) {
      return {
        error: (error as Error).message,
      };
    }
  },
};

export default OrderServices;
