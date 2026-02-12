import express from "express";
const router = express.Router();

// 1. Change require to a Named Import
// 2. Remember the .js extension!
import { registerVolunteer } from "../controllers/volunteerController.js";

router.post("/", registerVolunteer);

// 3. Change to export default
export default router;
