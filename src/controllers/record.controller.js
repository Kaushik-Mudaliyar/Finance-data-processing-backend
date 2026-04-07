import { recordModel } from "../models/record.model.js";
import { isValidObjectId } from "mongoose";
import { apiResponse } from "../utils/apiResponse.js";
async function createRecord(req, res) {
  const { amount, type, category, date, notes } = req.body;

  if (!amount || !type || !category || !date) {
    apiResponse(
      res,
      400,
      "For creating a record amount, type, category and date are required",
    );
  }

  if (type !== "income" && type !== "expense") {
    apiResponse(res, 400, "Invalid type, Type will either income or expense");
  }

  const record = await recordModel.create({
    amount,
    type,
    category,
    date,
    notes: notes || "",
  });

  apiResponse(res, 201, "Record created successfully", record);
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
  apiResponse(res, 200, "Records fetched successfully", {
    page,
    limit,
    total,
    totalPage: Math.ceil(total / limit),
    records,
  });
}

async function updateRecord(req, res) {
  const { amount, type, category, date, notes } = req.body;
  const { recordId } = req.params;

  if (!amount && !type && !category && !date && !notes) {
    apiResponse(
      res,
      400,
      "Amount, type, category, date or notes are required for updating a record",
    );
  }

  if (!isValidObjectId(recordId)) {
    apiResponse(res, 400, "Invalid recordId");
  }

  let updateRecord = {};

  if (amount) {
    if (amount <= 0) {
      apiResponse(res, 400, "Invalid Amount, Amount must be greater than 0");
    }

    updateRecord.amount = amount;
  }

  if (type) {
    if (type !== "income" && type !== "expense") {
      apiResponse(
        res,
        400,
        "Invalid type, Type must be either income or expense",
      );
    }
    updateRecord.type = type;
  }
  if (category) {
    updateRecord.category = category;
  }
  if (date) {
    if (typeof date !== "string") {
      apiResponse(res, 400, "Invalid Date, Date should be string not a number");
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
    apiResponse(res, 404, "Record does not exist");
  }

  apiResponse(res, 200, "Record updated successfully", updatedRecord);
}
async function deleteRecord(req, res) {
  const { recordId } = req.params;

  if (!isValidObjectId(recordId)) {
    apiResponse(res, 400, "Invalid recordId");
  }
  await recordModel.findByIdAndDelete({ _id: recordId });

  apiResponse(res, 200, "Record deleted successfully");
}

export { createRecord, getAllRecords, updateRecord, deleteRecord };
