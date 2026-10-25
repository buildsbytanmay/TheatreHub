import * as cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

import dotenv from "dotenv";
dotenv.config();

console.log("--- Cloudinary Configuration ---");
console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME ? "Loaded" : "Missing");
console.log("API Key:", process.env.CLOUDINARY_API_KEY ? "Loaded" : "Missing");
console.log("API Secret:", process.env.CLOUDINARY_API_SECRET ? "Loaded" : "Missing");
console.log("-----------------------------");

const hasCloudinary =
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET &&
  process.env.CLOUDINARY_CLOUD_NAME !== "your_cloudinary_cloud_name";

let storage;
if (hasCloudinary) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
      folder: "Movies",
      allowedFormats: ["jpeg", "png", "jpg"],
    },
  });
  console.log("✅ Cloudinary storage initialized successfully.");
} else {
  storage = multer.memoryStorage();
  console.log("ℹ️ Cloudinary credentials not configured. Using memory storage fallback.");
}

export const upload = multer({ storage });
