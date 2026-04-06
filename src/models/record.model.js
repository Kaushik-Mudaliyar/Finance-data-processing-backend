import mongoose from "mongoose";

const recordSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      min: [1, "Amount cannot be a negative value"],
      required: true,
    },
    type: {
      type: String,
      enum: {
        values: ["income", "expense"],
        message: "Type can be either income or expense",
      },
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

export const recordModel = mongoose.model("Record", recordSchema);
