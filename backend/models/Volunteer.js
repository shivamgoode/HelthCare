import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  skills: String,
  availability: String,
  location: String,
  aiEvaluation: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Use export default for the model
const Volunteer = mongoose.model("Volunteer", volunteerSchema);
export default Volunteer;
