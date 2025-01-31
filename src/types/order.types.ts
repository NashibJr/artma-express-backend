import { Schema } from "mongoose";
import { UserTypes } from "../models/user.model";
import { ProductTypes } from "./product.types";
export interface OrderTypes {
  orderNumber: string | number;
  address?: string;
  customer: Schema<UserTypes>;
  deliverer?: Schema<UserTypes>;
  amount: string | number;
  status: "pending" | "cancelled" | "fulfilled";
  shipped?: boolean;
}

export type OrderItemTypes = {
  product: Schema<ProductTypes>;
  quantity: number;
  unitPrice: number;
  tottalPrice: number;
};
