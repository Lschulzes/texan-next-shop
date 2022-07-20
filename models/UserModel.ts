import { IUser } from "./../interfaces/user";
import mongoose, { Schema, model, Model } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: {
        values: ["admin", "client"],
        message: "{VALUE} is not a valid role",
        default: "client",
      },
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ title: "text", tags: "text" });

export const UserModel: Model<IUser> =
  mongoose.models.User || model("User", UserSchema, "users");

export default UserModel;
