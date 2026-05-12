const express = require("express");

const multer = require("multer");

const fs = require("fs");

const {
  setDocumentContent,
} = require(
  "../data/contextStore"
);

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const router = express.Router();

const storage = multer.diskStorage({

  destination: function (
    req,
    file,
    cb
  ) {

    cb(null, "uploads/");
  },

  filename: function (
    req,
    file,
    cb
  ) {

    cb(
      null,
      Date.now() +
        "-" +
        file.originalname
    );
  },
});

const upload = multer({
  storage,
});

router.post(
  "/",
  authMiddleware,
  upload.single("file"),
  async (req, res) => {

    try {

      const filePath = req.file.path;

      const content =
        fs.readFileSync(
          filePath,
          "utf-8"
        );
        setDocumentContent(content);

      res.json({
        message:
          "File uploaded successfully",

        content,
      });

    } catch (error) {

      res.status(500).json({
        error: error.message,
      });
    }
  }
);

module.exports = router;