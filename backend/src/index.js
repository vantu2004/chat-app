import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import connectDB from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
  connectDB();
});
