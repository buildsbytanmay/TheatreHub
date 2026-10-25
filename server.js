import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

import users from "./controller/user.js";
import auth from "./controller/auth.js";
import movie from "./controller/movie.js";
import genre from "./controller/genre.js";

// Database connection
import "./utils/mongodb.js";

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(bodyParser.json({ limit: "10mb" }));

// Health check endpoint for uptime monitoring & cloud deploy checks
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date().toISOString() });
});

// App routes to handle API requests
app.use("/api/movies", movie);
app.use("/api/genres", genre);
app.use("/api/users", users);
app.use("/api/auth", auth);

// Undefined API routes return JSON 404
app.all("/api/*", (req, res) => {
  res.status(404).json({ error: `API route ${req.originalUrl} not found` });
});

// Serve frontend production build static assets
const buildPath = path.resolve(__dirname, "frontend", "build");
app.use(express.static(buildPath));

// For any other route, serve the React single-page application index.html
app.get("*", (req, res) => {
  const indexPath = path.join(buildPath, "index.html");
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(500).send("Frontend build not found. Please build the frontend first via 'npm run build'.");
    }
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
