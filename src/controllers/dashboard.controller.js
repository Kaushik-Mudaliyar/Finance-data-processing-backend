import { recordModel } from "../models/record.model.js";
import { apiResponse } from "../utils/apiResponse.js";
async function getRecordDetails(req, res) {
  const data = await recordModel.aggregate([
    {
      $facet: {
        summary: [
          {
            $group: {
              _id: null,
              totalIncome: {
                $sum: {
                  $cond: [{ $eq: ["$type", "income"] }, "$amount", 0],
                },
              },
              totalExpense: {
                $sum: {
                  $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0],
                },
              },
            },
          },
          {
            $project: {
              _id: 0,
              totalIncome: 1,
              totalExpense: 1,
              netBalance: {
                $subtract: ["$totalIncome", "$totalExpense"],
              },
            },
          },
        ],

        categoryWise: [
          {
            $group: {
              _id: "$category",
              total: { $sum: "$amount" },
            },
          },
        ],

        recent: [{ $sort: { date: -1 } }, { $limit: 5 }],
      },
    },
  ]);
  apiResponse(res, 200, "Dashboard fetched successfully", data);
}

export { getRecordDetails };
