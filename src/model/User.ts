import { Schema, model } from "mongoose";

interface IUser {
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

const User = model<IUser>("User", userSchema);

export default User;
