import express from "express";
import { logout } from "../controller/auth.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();
router.get("/", verifyToken, logout);
export default router;
