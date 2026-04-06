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

export { app };
