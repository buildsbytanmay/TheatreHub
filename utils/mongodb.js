import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbUri = process.env.MONGO_URL || process.env.MONGODB_URI;

if (!dbUri) {
  console.error("❌ ERROR: Neither MONGO_URL nor MONGODB_URI is defined in environment variables!");
} else {
  mongoose
    .connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("✅ MongoDB connected successfully"))
    .catch((err) => console.error("❌ MongoDB connection error:", err.message));
}
