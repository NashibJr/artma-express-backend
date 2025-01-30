import { Schema, model } from "mongoose";
import { CategoryTypes } from "../types/product.types";

const categorySchema = new Schema<CategoryTypes>(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

categorySchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "category",
  justOne: true,
});

const Category = model<CategoryTypes>("Category", categorySchema);

export default Category;
