import { Schema } from "mongoose";
import { UserTypes } from "../models/user.model";
import { OrderTypes } from "./order.types";

export interface NotificationTypes {
  reciever: Schema<UserTypes>;
  order: Schema<OrderTypes>;
  status: "read" | "unread";
  title: string;
  body: string;
}
