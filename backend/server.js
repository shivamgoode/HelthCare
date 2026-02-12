import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import supportRoutes from "./routes/supportRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import volunteerRoutes from "./routes/volunteerRoutes.js";

dotenv.config();

const app = express();

connectDB();

// ✅ CORS before routes
app.use(
  cors({
    origin: "https://helthcare-front.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.use(express.json());

app.use("/api/support", supportRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/volunteer", volunteerRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
