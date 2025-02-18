import { model, Schema } from "mongoose";
import { NotificationTypes } from "../types/notificaton.types";

const notificationSchema = new Schema<NotificationTypes>(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: false,
    },
    reciever: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "unread",
    },
  },
  { timestamps: true }
);

const Notification = model<NotificationTypes>(
  "Notification",
  notificationSchema
);

export default Notification;
