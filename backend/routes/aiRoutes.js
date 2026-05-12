const express = require("express");
const axios = require("axios");
const maskSensitiveData = require("../security/dlp");
const authMiddleware = require("../middleware/authMiddleware");
const checkAccess = require("../security/mcp");
const Log = require("../models/Log");
const Chat = require("../models/Chat");
const {
  getDocumentContent,
} = require(
  "../data/contextStore"
);

const router = express.Router();

router.post(
  "/chat",
  authMiddleware,
  async (req, res) => {

  try {

    const { message } = req.body;
    await Chat.create({
        userId: req.user.id,
        sender: "user",
        text: message,
    });
    const allowed = checkAccess(
        req.user.role,
        message
    );

    if (!allowed) {

    await Log.create({
        email: req.user.id,
        role: req.user.role,
        message,
        status: "BLOCKED",
    });

    return res.json({
        reply:
        "ACCESS DENIED: Sensitive information restricted.",
    });
    }

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",

        messages: [
            {
                role: "system",
                content:
                `
                You are a secure AI assistant.

                Use the uploaded document
                context to answer questions.

                DOCUMENT:
                ${getDocumentContent()}
                `,
            },

            {
                role: "user",
                content: message,
            },
        ],
      },
      {
        headers: {
          Authorization:
            `Bearer ${process.env.GROQ_API_KEY}`,

          "Content-Type": "application/json",
        },
      }
    );

    let aiReply = response.data.choices[0].message.content;

    if (req.user.role !== "admin") {
      aiReply = maskSensitiveData(aiReply);
    }

    await Log.create({
        email: req.user.id,
        role: req.user.role,
        message,
        status: "ALLOWED",
    });
    await Chat.create({
        userId: req.user.id,
        sender: "ai",
        text: aiReply,
    });
    res.json({
      reply: aiReply,
    });

  } catch (error) {

    console.log(error.response?.data || error);

    res.status(500).json({
      error: "AI request failed",
    });
  }
});

module.exports = router;