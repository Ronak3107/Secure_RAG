const express = require("express");

const Log = require("../models/Log");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const router = express.Router();

router.get(
  "/stats",
  authMiddleware,
  async (req, res) => {

    try {

      const totalLogs =
        await Log.countDocuments();

      const blockedLogs =
        await Log.countDocuments({
          status: "BLOCKED",
        });

      const allowedLogs =
        await Log.countDocuments({
          status: "ALLOWED",
        });

      res.json({
        totalLogs,
        blockedLogs,
        allowedLogs,
      });

    } catch (error) {

      res.status(500).json({
        error: error.message,
      });
    }
  }
);

module.exports = router;