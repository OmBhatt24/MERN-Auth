import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getUser } from "../controller/user.js";
const router = express.Router();

router.get("/", verifyToken, getUser);
export default router;
