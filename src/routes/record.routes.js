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

const router = Router();
router.post(
  "/create-record",
  authMiddleware,
  authorizeRoles("admin"),
  createRecord,
);
router.get(
  "/",
  authMiddleware,
  authorizeRoles("admin", "analyst"),
  getAllRecords,
);
router.patch(
  "/update-record/:recordId",
  authMiddleware,
  authorizeRoles("admin"),
  updateRecord,
);
router.delete(
  "/delete-record/:recordId",
  authMiddleware,
  authorizeRoles("admin"),
  deleteRecord,
);

export default router;
