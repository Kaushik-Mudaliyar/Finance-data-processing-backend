import { recordModel } from "../models/record.model.js";
import { isValidObjectId } from "mongoose";
async function createRecord(req, res) {
  const { amount, type, category, date, notes } = req.body;

  if (!amount || !type || !category || !date) {
    return res.status(400).json({
      message:
        "For creating a record amount, type, category, and date are required",
    });
  }

  if (type !== "income" && type !== "expense") {
    return res
      .status(400)
      .json({ message: "Invalid type. Type will either income or expense" });
  }

  const record = await recordModel.create({
    amount,
    type,
    category,
    date,
    notes: notes || "",
  });

  return res
    .status(201)
    .json({ message: "Record created successfully", record });
}

async function getAllRecords(req, res) {
  const { type, category, date, page = 1, limit = 10 } = req.query;

  let filter = {};

  if (type) {
    filter.type = type;
  }

  if (category) {
    filter.category = category;
  }
  if (date) {
    filter.date = date;
  }

  const records = await recordModel
    .find({ ...filter })
    .skip(Number((page - 1) * limit))
    .limit(Number(limit));

  const total = await recordModel.countDocuments();
  return res.status(200).json({
    message: "Records fetched successfully",
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    data: records,
  });
}

async function updateRecord(req, res) {
  const { amount, type, category, date, notes } = req.body;
  const { recordId } = req.params;

  if (!amount && !type && !category && !date && !notes) {
    return res.status(400).json({
      message:
        "Amount, type, category,date or notes are required for updating a record",
    });
  }

  if (!isValidObjectId(recordId)) {
    return res.status(400).json({ message: "Invalid recordId" });
  }

  let updateRecord = {};

  if (amount) {
    if (amount <= 0) {
      return res
        .status(400)
        .json({ message: "Invalid Amount, Amount must be greater than 0" });
    }

    updateRecord.amount = amount;
  }

  if (type) {
    if (type !== "income" && type !== "expense") {
      return res.status(400).json({
        message: "Invalid type, Type must be either income or expense",
      });
    }
    updateRecord.type = type;
  }
  if (category) {
    updateRecord.category = category;
  }
  if (date) {
    if (typeof date !== "string") {
      return res
        .status(400)
        .json({ message: "Invalid Date, Date should be string not a number" });
    }
    updateRecord.date = date;
  }

  if (notes) {
    if (notes !== "") {
      updateRecord.notes = notes;
    }
  }

  const updatedRecord = await recordModel.findByIdAndUpdate(
    { _id: recordId },
    { ...updateRecord },
    { returnDocument: "after" },
  );

  if (!updateRecord) {
    return res.status(404).json({ message: "Record does not exist" });
  }

  return res
    .status(200)
    .json({ message: "Record updated successfully", updatedRecord });
}
async function deleteRecord(req, res) {
  const { recordId } = req.params;

  if (!isValidObjectId(recordId)) {
    return res.status(400).json({ message: "Invalid recordId" });
  }
  await recordModel.findByIdAndDelete({ _id: recordId });

  return res.status(200).json({ message: "Record deleted successfully" });
}

export { createRecord, getAllRecords, updateRecord, deleteRecord };
