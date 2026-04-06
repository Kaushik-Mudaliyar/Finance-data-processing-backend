import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Name is required while creating a user"],
    },
    email: {
      type: String,
      required: [true, "Email is required while creating a user"],
      unique: [true, "Email needs to be unique for each user"],
      lowercase: true,
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "viewer", "analyst"],
        message: "A user must be admin, viewer and analyst",
      },
      default: "viewer",
    },
    status: {
      type: String,
      enum: {
        values: ["ACTIVE", "INACTIVE"],
        message: "A user must be ACTIVE or INACTIVE",
      },
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  },
);

export const userModel = mongoose.model("User", userSchema);
