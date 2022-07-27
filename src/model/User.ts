import { Schema, model } from "mongoose";

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isInstructor: boolean;
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isInstructor: { type: Boolean, required: true },
});

export const User = model<IUser>("User", userSchema);
