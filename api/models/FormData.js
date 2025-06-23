const mongoose = require('mongoose');

const FormDataSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    otp: { type: String, default: null } 
})

const FormDataModel = mongoose.model('log_reg_form', FormDataSchema);

module.exports = FormDataModel;