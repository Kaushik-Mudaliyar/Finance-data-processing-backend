import { recordModel } from "../models/record.model.js";
async function getRecordDetails(req, res) {
  const overview = await recordModel.aggregate([
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
        totalIncome: 1,
        totalExpense: 1,
        netBalance: {
          $subtract: ["$totalIncome", "$totalExpense"],
        },
      },
    },
  ]);
  const categories = await recordModel.aggregate([
    {
      $group: {
        _id: "$category",
        totalSum: { $sum: "$amount" },
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        totalSum: 1,
      },
    },
  ]);
  const recentActivity = await recordModel.aggregate([
    {
      $sort: {
        date: -1,
      },
    },
    {
      $limit: 5,
    },
  ]);
  const monthlyTrends = await recordModel.aggregate([
    {
      $group: {
        _id: { $month: "$date" },
        income: {
          $sum: {
            $cond: [{ $eq: ["$type", "income"] }, "$amount", 0],
          },
        },
        expense: {
          $sum: {
            $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        month: "$_id",
        income: 1,
        expense: 1,
      },
    },
    {
      $sort: { month: 1 },
    },
  ]);

  return res.status(200).json({
    message: "Dashboard fetched successfully",
    overview: overview[0],
    categories,
    recentActivity,
    monthlyTrends,
  });
}

export { getRecordDetails };
