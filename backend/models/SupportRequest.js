import mongoose from "mongoose";

const supportSchema = new mongoose.Schema({
  name: String,
  email: String,
  issue: String,
  urgency: String,
  aiSummary: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Change module.exports to export default
const SupportRequest = mongoose.model("SupportRequest", supportSchema);
export default SupportRequest;
