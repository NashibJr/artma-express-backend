import { model, Schema } from "mongoose";
import { ProductTypes } from "../types/product.types";

const productSchema = new Schema<ProductTypes>(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    stockQuantity: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: false,
    },
    height: {
      type: Number,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    percentageDisc: {
      type: String,
      required: true,
    },
    flashSale: {
      type: Boolean,
      required: true,
      default: false,
    },
    decription: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    image: {
      type: String,
      required: true,
    },
    uploader: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Product = model<ProductTypes>("Product", productSchema);

export default Product;
