const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load environment variables
console.log("Environment Variables:", process.env); //log will ensure we have correct env variables

const tasksRoutes = require("./routes/tasks");
const usersRoutes = require("./routes/users");

const app = express();

// app.use(express.json());

// Middleware
app.use(cors({ origin: "http://localhost:3000" })); // Allow requests from frontend
app.use(express.json());

// Mount Routes
app.use("/api/tasks", tasksRoutes);
app.use("/api/users", usersRoutes);

// Default Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Task Management API!" });
});

// 404 Middleware to catch mistakes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start the API server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`API server is running on http://localhost:${PORT}`);
});

// Test Query for db connection
const pool = require("./config/db");

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Database connection error");
  }
});
