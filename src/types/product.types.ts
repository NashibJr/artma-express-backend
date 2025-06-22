import { Schema } from "mongoose";
import { UserTypes } from "../models/user.model";

export interface CategoryTypes {
  name: string;
  image?: string;
}

export interface ProductTypes extends CategoryTypes {
  category: Schema<CategoryTypes>;
  stockQuantity: number;
  width?: number;
  height?: number;
  price: number | string;
  percentageDisc: string;
  flashSale: boolean;
  decription: string;
  sku: string;
  images?: string[];
  uploader: Schema<UserTypes>;
  image?: string;
  productColor?: string;
  deliveryStatus: string;
}
