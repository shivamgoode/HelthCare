import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Note: process.env.MONGO_URI is correct if you've called dotenv.config() in server.js
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
