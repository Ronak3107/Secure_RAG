const fs = require("fs");

const path = require("path");

function getDocumentContent() {

  try {

    const filePath = path.join(

      __dirname,

      "../uploads/samplefile.txt"

    );

    const content =
    fs.readFileSync(
      filePath,
      "utf-8"
    );

    return content;

  } catch (error) {

    console.log(error);

    return "No document uploaded.";

  }

}

module.exports = {
  getDocumentContent,
};