export const errorHandler = (err, req, res, next) => {
  console.error(err);

  let statusCode = 500;

  if (err.name === "CastError") statusCode = 400;

  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
  });
};
