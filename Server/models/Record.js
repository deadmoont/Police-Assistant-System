// back/models/Record.js
const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  caseNumber: { type: String, required: true, unique: true },
  applicant: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: {
    // Nested address schema
    street: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: String, required: true },
  },
  description: { type: String, required: true },
  category: { type: String, required: true },
  incidentDate: { type: String, required: true },
  incidentTime: { type: String, required: true },
});

const Record = mongoose.model("Record", recordSchema);
module.exports = Record;
