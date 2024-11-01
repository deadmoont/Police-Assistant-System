// back/models/Record.js
const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  caseNumber: { type: String, required: true },
  fullName: { type: String, required: true }, // renamed from applicant to match frontend
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: String, required: true },
  },
  description: { type: String, required: true },
  category: { type: String, required: true },
  incidentDate: { type: Date, required: true },
  incidentTime: { type: String, required: true },
});

const Record = mongoose.model("Record", recordSchema);
module.exports = Record;
