import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Clean duplicate slashes in URLs (e.g. //auth/register -> /auth/register)
app.use((req, res, next) => {
  if (req.url) {
    req.url = req.url.replace(/\/{2,}/g, "/");
  }
  next();
});

// CORS Configuration - Allow all client origins (Vercel, Localhost, Render)
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Root Welcome Route (for Render Web Service probe)
app.get("/", (req, res) => {
  res.json({
    status: "online",
    name: "upNext Express API Server",
    message: "Welcome to upNext backend API! System operational.",
    healthCheck: "/api/health",
    eventsEndpoint: "/api/events",
  });
});

// API Health Route
app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    service: "upNext Express API",
    timestamp: new Date().toISOString(),
    database: "MongoDB Atlas",
    version: "1.0.0",
    endpoints: [
      "/api/health",
      "/api/auth/register",
      "/api/auth/login",
      "/api/auth/me",
      "/api/events",
      "/api/events/nearby",
      "/api/events/:id",
      "/api/events/:id/bookmark",
      "/api/tickets",
      "/api/tickets/my",
      "/api/vendors",
    ],
  });
});

// Mounting API Routes (supports both /api prefix and direct routes)
app.use("/api/auth", authRoutes);
app.use("/auth", authRoutes);

app.use("/api/events", eventRoutes);
app.use("/events", eventRoutes);

app.use("/api/tickets", ticketRoutes);
app.use("/tickets", ticketRoutes);

app.use("/api/vendors", vendorRoutes);
app.use("/vendors", vendorRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 upNext Express API Server running on port ${PORT} (${process.env.NODE_ENV || "development"})`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🎉 Events Endpoint: http://localhost:${PORT}/api/events`);
});
