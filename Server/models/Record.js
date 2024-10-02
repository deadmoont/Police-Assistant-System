// models/Record.js
const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    caseNumber: { type: String, required: true },
    applicant: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Record', recordSchema);
