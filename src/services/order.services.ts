import Order from "../models/order.model";
import { OrderTypes } from "../types/order.types";

interface StatusProps {
  status: string;
}

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
      return await Order.find({}).populate(["orderItems"]);
    } catch (error) {
      return {
        error: (error as Error).message,
      };
    }
  },
  assignDeliverer: async (data: OrderTypes, orderId: string) => {
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
  deleteOrder: async (orderId: string) => {
    try {
      await Order.findByIdAndDelete(orderId);

      return {
        message: "Order successfully deleted",
      };
    } catch (error) {
      return {
        error: (error as Error).message,
      };
    }
  },
  getSingleOrder: async (orderId: string) => {
    try {
      const order = await Order.findById(orderId).populate([
        {
          path: "orderItems",
          populate: {
            path: "product",
          },
        },
        "customer",
        "deliverer",
      ]);

      return order;
    } catch (error) {
      return {
        error: (error as Error).message,
      };
    }
  },
  changeStatus: async (orderId: string, status: StatusProps) => {
    try {
      await Order.findByIdAndUpdate(orderId, { status: status.status });

      return {
        message: "Order successfully updated",
      };
    } catch (error) {
      return {
        error: (error as Error).message,
      };
    }
  },
  getUserOrders: async (userId: string) => {
    try {
      const orders = await Order.find({ customer: userId }).populate([
        {
          path: "orderItems",
          populate: {
            path: "product",
          },
        },
      ]);

      return orders;
    } catch (error) {
      return {
        error: (error as Error).message,
      };
    }
  },
};

export default OrderServices;
