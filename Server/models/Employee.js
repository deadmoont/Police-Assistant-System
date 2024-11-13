const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: String,
  age: Number,
  position: String,
  phoneNo: String,
  address: String,
  working: { type: String, enum: ["free", "busy"], default: "free" },
  desc: { type: String, default: "" },
  status: { type: String, enum: ["present", "absent"], default: "present" },
});

module.exports = mongoose.model("Employee", employeeSchema);
