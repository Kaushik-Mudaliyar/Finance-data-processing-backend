import { Router } from "express";
import {
  createUser,
  updateUser,
  getAllUsers,
} from "../controllers/user.controller.js";
import {
  authMiddleware,
  authorizeRoles,
} from "../middleware/auth.middleware.js";
import asyncHandler from "../utils/asyncHandler.js";
const router = Router();

router.post(
  "/create-user",
  authMiddleware,
  authorizeRoles("admin"),
  asyncHandler(createUser),
);
router.patch(
  "/update-user/:userId",
  authMiddleware,
  authorizeRoles("admin"),
  asyncHandler(updateUser),
);
router.get(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  asyncHandler(getAllUsers),
);
export default router;
