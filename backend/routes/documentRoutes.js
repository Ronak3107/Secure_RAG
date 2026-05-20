const express = require("express");

const fs = require("fs");

const path = require("path");

const authMiddleware =
require("../middleware/authMiddleware");

const router = express.Router();

router.put(
  "/update",
  authMiddleware,

  async (req, res) => {

    try {

      // ADMIN ONLY

      if (req.user.role !== "admin") {

        return res.status(403).json({

          error: "Unauthorized",

        });

      }

      const { newContent } =
      req.body;

      if (!newContent) {

        return res.status(400).json({

          error:
          "No content provided",

        });

      }

      // sample.txt PATH

      const filePath = path.join(

        __dirname,

        "../uploads/sample.txt"

      );

      // APPEND CONTENT

      fs.appendFileSync(

        filePath,

        `\n${newContent}\n`

      );

      res.json({

        message:
        "Document updated successfully",

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        error:
        error.message,

      });

    }

  }
);

module.exports = router;