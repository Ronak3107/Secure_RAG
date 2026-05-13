const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  email: String,

  role: String,

  message: String,

  status: String,

  latency: Number,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "Log",
  logSchema
);