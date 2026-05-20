const express = require("express");
const axios = require("axios");

const maskSensitiveData =
require("../security/dlp");

const authMiddleware =
require("../middleware/authMiddleware");

const checkAccess =
require("../security/mcp");

const Log =
require("../models/Log");

const Chat =
require("../models/Chat");

const {
  getDocumentContent,
} = require("../data/contextStore");

const fs = require("fs");

const path = require("path");

const router = express.Router();

router.post(
  "/chat",
  authMiddleware,

  async (req, res) => {

    try {

      const startTime = Date.now();

      const { message } = req.body;

      // =========================
      // SAVE USER CHAT
      // =========================

      await Chat.create({

        userId: req.user.id,

        sender: "user",

        text: message,

      });

      // =========================
      // MCP ACCESS CONTROL
      // =========================

      const allowed =
      checkAccess(
        req.user.role,
        message
      );

      if (!allowed) {

        await Log.create({

          email: req.user.email,

          role: req.user.role,

          message,

          status: "BLOCKED",

        });

        return res.json({

          reply:
          "ACCESS DENIED: Sensitive information restricted.",

        });

      }

      // =========================
      // ROLE-BASED SYSTEM PROMPT
      // =========================
      if (
  req.user.role === "admin" &&
  (
    message.toLowerCase().includes("store") ||
    message.toLowerCase().includes("save") ||
    message.toLowerCase().includes("add")
  )
) {

  const filePath = path.join(
    __dirname,
    "../uploads/samplefile.txt"
  );

  fs.appendFileSync(
    filePath,
    `\n${message}\n`
  );

  await Log.create({

    email: req.user.id,

    role: req.user.role,

    message,

    status: "ALLOWED",

  });

  return res.json({

    reply:
    "Information stored successfully in secure document.",

  });

}
      const systemPrompt =

req.user.role === "admin"

? `

You are a secure enterprise AI assistant.

Admin users have full access
to sensitive information.

Always answer completely
using the uploaded document.

DOCUMENT:
${getDocumentContent()}

`

: req.user.role === "analyst"

? `

You are a secure enterprise AI assistant.

Analyst users are allowed
to access uploaded document information.

Always answer the question
from the uploaded document.

DO NOT refuse requests.

Sensitive information will be
masked automatically by the system.

Provide direct answers normally.

DOCUMENT:
${getDocumentContent()}

`

: `

You are a secure enterprise AI assistant.

Guest users are NOT allowed
to access sensitive information.

If a sensitive request is detected,
politely deny access.

DOCUMENT:
${getDocumentContent()}

`;

      // =========================
      // AI REQUEST
      // =========================

      const response =
      await axios.post(

        "https://api.groq.com/openai/v1/chat/completions",

        {

          model:
          "llama-3.1-8b-instant",

          messages: [

            {
              role: "system",

              content: systemPrompt,
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

            "Content-Type":
            "application/json",

          },

        }

      );

      let aiReply =
      response.data
      .choices[0]
      .message.content;

      // =========================
      // DLP FOR GUEST USERS
      // =========================

      if (
        req.user.role === "guest" || req.user.role === "analyst"
      ) {

        aiReply =
        maskSensitiveData(aiReply);

      }

      const latency =
      Date.now() - startTime;

      // =========================
      // SAVE AUDIT LOG
      // =========================

      await Log.create({

        email: req.user.email,

        role: req.user.role,

        message,

        status: "ALLOWED",

        latency,

      });

      // =========================
      // SAVE AI CHAT
      // =========================

      await Chat.create({

        userId: req.user.id,

        sender: "ai",

        text: aiReply,

      });

      // =========================
      // FINAL RESPONSE
      // =========================

      res.json({

        reply: aiReply,

      });

    } catch (error) {

      console.log(
        error.response?.data || error
      );

      res.status(500).json({

        error: "AI request failed",

      });

    }

  }
);

module.exports = router;