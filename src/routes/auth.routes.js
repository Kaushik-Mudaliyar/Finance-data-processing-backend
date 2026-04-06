import { Router } from "express";

const router = Router();

// import routes
import { loginUser } from "../controllers/auth.controller.js";
// define routes
router.post("/login", loginUser);
export default router;
