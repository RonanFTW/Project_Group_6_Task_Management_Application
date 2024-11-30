const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// GET /api/users - Retrieve all users
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

module.exports = router;
