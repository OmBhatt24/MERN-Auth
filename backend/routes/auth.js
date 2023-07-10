import express from "express";
import { login, signUp } from "../controller/auth.js";
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("hello world");
});
router.post("/signup", signUp);
router.post("/login", login);

export default router;
