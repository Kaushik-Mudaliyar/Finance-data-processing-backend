import { Router } from "express";
import { getRecordDetails } from "../controllers/dashboard.controller.js";
import {
  authMiddleware,
  authorizeRoles,
} from "../middleware/auth.middleware.js";
const router = Router();
router.get(
  "/",
  authMiddleware,
  authorizeRoles("admin", "viewer", "analyst"),
  getRecordDetails,
);

export default router;
