import { configDotenv } from "dotenv";
configDotenv();
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import refreshRoutes from "./routes/refresh.js";
import logoutRoutes from "./routes/logout.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());
app.use(express.json());
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() =>
    app.listen(3000, () =>
      console.log(
        "db is connected & server is running at http://localhost:3000"
      )
    )
  );

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/refresh", refreshRoutes);
app.use("/logout", logoutRoutes);
