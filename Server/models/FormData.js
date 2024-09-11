const mongoose = require('mongoose');

const FormDataSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    favoritePet: String  // Add favorite pet
})

const FormDataModel = mongoose.model('log_reg_form', FormDataSchema);

module.exports = FormDataModel;
