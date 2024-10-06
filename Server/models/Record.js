// back/models/Record.js
const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  caseNumber: { type: String, required: true },
  applicant: { type: String, required: true },
  phoneNumber: { type: String, required: true },  // Added phoneNumber field
  address: { type: String, required: true },      // Added address field
  description: { type: String, required: true },  // Added description field
  category: { type: String, required: true }
});

const Record = mongoose.model('Record', recordSchema);
module.exports = Record;
