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
  },
  { timestamps: true }
);

const User = model.model<UserTypes>("User", userSchema);

export default User;
