import { apiResponse } from "../utils/apiResponse.js";
export const errorHandler = (err, req, res, next) => {
  console.error(err);

  let statusCode = 500;

  if (err.name === "CastError") statusCode = 400;

  apiResponse(res, statusCode, err.message || "Internal Server Error");
};
