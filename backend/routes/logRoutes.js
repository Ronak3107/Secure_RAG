const express = require("express");

const Log = require("../models/Log");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      const logs = await Log.find().sort({
        createdAt: -1,
      });

      res.json(logs);

    } catch (error) {

      res.status(500).json({
        error: error.message,
      });
    }
  }
);

module.exports = router;