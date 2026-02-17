require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const appointmentRoutes = require("./routes/appointment.routes");

const app = express();

connectDB();

// CORS configuration for production
const corsOptions = {
  origin: process.env.FRONTEND_URL || "*",
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// API routes
app.use("/api", authRoutes);
app.use("/api", appointmentRoutes);

// Serve static files from React build (if frontend is deployed with backend)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  // SPA fallback - serve index.html for all non-API routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/dist/index.html"));
  });
}

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT || 5000}`)
);
