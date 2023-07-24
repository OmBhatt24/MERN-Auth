import express from "express";
import { refreshToken, verifyToken } from "../middleware/auth.js";
import { getUser } from "../controller/user.js";
const router = express.Router();

router.get("/", refreshToken, verifyToken, getUser);
export default router;
