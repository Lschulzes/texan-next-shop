import { IUser } from "./../interfaces/user";
import validator from "validator";
import bcrypt from "bcryptjs";
import mongoose, { Schema, model, Model } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name"],
      unique: true,
      trim: true,
      maxlength: [25, "A user name must have less or equal than 25 characters"],
      minlength: [5, "A user name must have less or equal than 5 characters"],
    },
    email: {
      type: String,
      required: [true, "Please tell us your Email"],
      lowercase: true,
      unique: true,
      trim: true,
      maxlength: [50, "A email must have less or equal than 50 characters"],
      minlength: [5, "A email must have less or equal than 5 characters"],
      validate: [validator.isEmail, "Please provide a valid Email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      maxlength: [30, "A password must have less than or equal 30 characters"],
      minlength: [10, "A password must have more than or equal 10 characters"],
      select: false,
    },
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

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hashSync(this.password);
  next();
});

UserSchema.index({ title: "text", tags: "text" });

export const UserModel: Model<IUser> =
  mongoose.models.User || model("User", UserSchema, "users");

export default UserModel;
