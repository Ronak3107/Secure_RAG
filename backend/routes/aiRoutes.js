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

      // =========================
      // ROLE-BASED SYSTEM PROMPT
      // =========================

      const systemPrompt =

req.user.role === "admin"

? `

You are a secure enterprise AI assistant.

You MUST answer ONLY from the provided document.

The uploaded document content is real
and already available below.

Do NOT say:
- "I cannot access documents"
- "I need permissions"
- "I cannot view uploads"

Admin users ARE authorized
to access all sensitive information.

If the answer exists in the document,
return it directly.

DOCUMENT CONTENT:
==================
${getDocumentContent()}
==================

`

: `

You are a secure enterprise AI assistant.

You MUST answer ONLY from the provided document.

Guest users are NOT authorized
to access sensitive information.

Never reveal:
- patient names
- account numbers
- phone numbers
- emails
- financial details

If sensitive information is requested,
reply with:
"ACCESS DENIED"

DOCUMENT CONTENT:
==================
${getDocumentContent()}
==================

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
        req.user.role !== "admin"
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

        email: req.user.id,

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