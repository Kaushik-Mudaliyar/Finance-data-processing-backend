import express from "express";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser());
// import routes
import userRouter from "./routes/user.routes.js";
import recordRouter from "./routes/record.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";
import authRouter from "./routes/auth.routes.js";
// use routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/records", recordRouter);
app.use("/api/dashboard", dashboardRouter);

// global error handling
app.use((err, req, res, next) => {
  console.error(err);

  let statusCode = 500;

  if (err.name === "CastError") statusCode = 400;

  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
  });
});

export { app };
