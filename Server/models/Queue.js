// models/Queue.js
const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  description: { type: String, required: true },
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Queue", queueSchema);
