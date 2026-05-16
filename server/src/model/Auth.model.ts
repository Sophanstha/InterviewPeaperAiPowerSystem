import mongoose from "mongoose";
import type {IUser} from "../types/type"

const UserSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [20, "Username cannot exceed 20 characters"]
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email"]
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"]
    }
  },
  {
    timestamps: true
  }
);

// Model
export const User = mongoose.model<IUser>("User", UserSchema);