import model, { Schema, Document } from "mongoose";

export interface UserTypes extends Document {
  fullName: string;
  email: string;
  image?: any;
  phone: string;
  address?: string;
  nin?: string;
  shopeNumber?: string;
  password: string;
  role: string;
  frontNID?: string;
  backNID?: string;
  createdAt?: string;
  updatedAt?: string;
}

const userSchema = new Schema<UserTypes>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String, required: false },
    phone: { type: String, required: true },
    address: { type: String, required: false },
    nin: { type: String, required: false },
    password: { type: String, required: true },
    role: { type: String, required: true },
    frontNID: { type: String, required: false },
    backNID: { type: String, required: false },
  },
  { timestamps: true }
);

const User = model.model<UserTypes>("User", userSchema);

export default User;
