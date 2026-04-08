import express from "express";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/error.middleware.js";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

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
app.use(errorHandler);

export { app };
