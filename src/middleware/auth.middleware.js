import jwt from "jsonwebtoken";
import { apiResponse } from "../utils/apiResponse.js";
import { userModel } from "../models/user.model.js";
async function authMiddleware(req, res, next) {
  try {
    // 1. Get token from headers or cookies
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

    if (!token) {
      apiResponse(res, 401, "Not authenticated");
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Attach user to request
    const user = await userModel.findById(decoded.userId);
    if (!user || user.status !== "ACTIVE") {
      apiResponse(res, 401, "Unauthorized");
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      apiResponse(res, 401, "Not authenticated");
    }

    if (!allowedRoles.includes(req.user.role)) {
      apiResponse(res, 403, "Access Denied");
    }

    next();
  };
}

export { authMiddleware, authorizeRoles };
