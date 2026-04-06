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

const router = Router();

router.post(
  "/create-user",
  authMiddleware,
  authorizeRoles("admin"),
  createUser,
);
router.patch(
  "/update-user/:userId",
  authMiddleware,
  authorizeRoles("admin"),
  updateUser,
);
router.get("/", authMiddleware, authorizeRoles("admin"), getAllUsers);
export default router;
