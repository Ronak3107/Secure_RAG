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

      let logs;

      // ADMIN CAN SEE ALL LOGS

      if (req.user.role === "admin") {

        logs = await Log.find()
        .sort({ createdAt: -1 });

      }

      // GUEST CAN SEE ONLY OWN LOGS

      else {

        logs = await Log.find({
          email: req.user.email,
        }).sort({
          createdAt: -1,
        });

      }

      res.json(logs);

    } catch (error) {

      res.status(500).json({
        error: "Failed to fetch logs",
      });

    }

  }
);

module.exports = router;