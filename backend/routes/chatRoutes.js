import express from "express";
const router = express.Router();

// 1. Use Named Import (with curly braces)
// 2. YOU MUST add the .js extension for local files
import { chatWithAI } from "../controllers/chatController.js";

router.post("/", chatWithAI);

export default router;
