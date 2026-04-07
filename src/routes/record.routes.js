import { Router } from "express";
import {
  createRecord,
  getAllRecords,
  updateRecord,
  deleteRecord,
} from "../controllers/record.controller.js";
import {
  authMiddleware,
  authorizeRoles,
} from "../middleware/auth.middleware.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = Router();
router.post(
  "/create-record",
  authMiddleware,
  authorizeRoles("admin"),
  asyncHandler(createRecord),
);
router.get(
  "/",
  authMiddleware,
  authorizeRoles("admin", "analyst"),
  asyncHandler(getAllRecords),
);
router.patch(
  "/update-record/:recordId",
  authMiddleware,
  authorizeRoles("admin"),
  asyncHandler(updateRecord),
);
router.delete(
  "/delete-record/:recordId",
  authMiddleware,
  authorizeRoles("admin"),
  asyncHandler(deleteRecord),
);

export default router;
