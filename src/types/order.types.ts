// export type OrderItemTypes={
//   product:P
// }

import { Schema } from "mongoose";
import { UserTypes } from "../models/user.model";

export interface OrderTypes {
  orderNumber: string | number;
  address?: string;
  customer: Schema<UserTypes>;
  deliverer?: Schema<UserTypes>;
  amount: string | number;
  status: "pending" | "cancelled" | "fulfilled";
  shipped?: boolean;
}
