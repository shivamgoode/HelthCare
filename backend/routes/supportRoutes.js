import express from "express";
const router = express.Router();

// 1. Change require to import with { }
// 2. Add the .js extension for the local file path
import { submitSupport } from "../controllers/supportController.js";

router.post("/", submitSupport);

// 3. Change module.exports to export default
export default router;
