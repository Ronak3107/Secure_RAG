const express = require("express");

const Chat = require("../models/Chat");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const router = express.Router();

router.get(
  "/history",
  authMiddleware,
  async (req, res) => {

    try {

      const chats = await Chat.find({
        userId: req.user.id,
      }).sort({
        createdAt: 1,
      });

      res.json(chats);

    } catch (error) {

      res.status(500).json({
        error: error.message,
      });
    }
  }
);

module.exports = router;