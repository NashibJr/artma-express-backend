import Notification from "../models/notification.model";
import { NotificationTypes } from "../types/notificaton.types";

const NotificationServices = {
  create: async (notificationData: NotificationTypes) => {
    try {
      const notification = await Notification.create(notificationData);

      return {
        ...notification.toJSON(),
        massage: "Notification successfully sent",
      };
    } catch (error) {
      return {
        error: (error as Error).message,
      };
    }
  },
  getAllNotifications: async () => {
    try {
      return await Notification.find({});
    } catch (error) {
      return {
        error: (error as Error).message,
      };
    }
  },
  markAsRead: async (notificationId: string) => {
    try {
      const notification = await Notification.findById(notificationId);
      if (notification?.status === "read") {
        return;
      } else {
        await notification!.updateOne({ status: "read" });

        return {
          message: "Notification marked as read",
        };
      }
    } catch (error) {
      return {
        error: (error as Error).message,
      };
    }
  },
};

export default NotificationServices;
