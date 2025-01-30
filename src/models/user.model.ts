import model, { Schema } from "mongoose";

export interface UserTypes {
  fullName: string;
  email: string;
  profileImage?: any;
  phone: string;
  address?: string;
  nin?: string;
  shopNumber?: string;
  password: string;
  role: "admin" | "supplier" | "deliverer" | "customer";
  frontNID?: string;
  backNID?: string;
  createdAt?: string;
  updatedAt?: string;
  active?: boolean;
}

const userSchema = new Schema<UserTypes>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profileImage: { type: String, required: false },
    phone: { type: String, required: true, unique: true },
    address: { type: String, required: false },
    nin: { type: String, required: false },
    password: { type: String, required: true },
    role: { type: String, required: true },
    frontNID: { type: String, required: false },
    backNID: { type: String, required: false },
    shopNumber: { type: String, required: false },
    active: { type: Boolean, default: true },
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

userSchema.virtual("order", {
  ref: "Order",
  localField: "_id",
  foreignField: "customer",
  justOne: false,
});

userSchema.virtual("order", {
  ref: "Order",
  localField: "_id",
  foreignField: "deliverer",
  justOne: false,
});

const User = model.model<UserTypes>("User", userSchema);

export default User;
