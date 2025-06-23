// api/index.js

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const nodemailer = require("nodemailer");

// Models
const FormDataModel = require("./models/FormData");
const Record = require("./models/Record");
const Queue = require("./models/Queue");
const Done = require("./models/Done");
const Employee = require("./models/Employee");

// Load .env from project-root
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const app = express();

// CORS: allow your front-end only
const CLIENT_URL = process.env.CLIENT_URL || "*";
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL, {})
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// ─── AUTH ──────────────────────────────────────────────────────────────────────

// Register
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;

  const existing = await FormDataModel.findOne({ email });
  if (existing) {
    return res.status(409).json({ message: "Already registered" });
  }

  const user = await FormDataModel.create({ email, password });
  res.status(201).json(user);
});

// Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await FormDataModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "No records found!" });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: "Wrong password" });
  }

  res.json({ message: "Success" });
});

// Send OTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/api/send-otp", async (req, res) => {
  try {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);

    await FormDataModel.updateOne({ email }, { $set: { otp } });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is ${otp}`,
    });

    res.json({ message: "OTP sent to your email!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error sending OTP", error: err });
  }
});

// Verify OTP
app.post("/api/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await FormDataModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    await FormDataModel.updateOne({ email }, { $unset: { otp: "" } });
    res.json({ message: "OTP verified successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error verifying OTP", error: err });
  }
});

// Change Password
app.post("/api/change-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    await FormDataModel.updateOne({ email }, { password: newPassword });
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating password", error: err });
  }
});

// ─── RECORDS ────────────────────────────────────────────────────────────────────

// Create record
app.post("/api/records", async (req, res) => {
  const {
    caseNumber,
    applicant,
    email,
    phoneNumber,
    address,
    description,
    category,
    incidentDate,
    incidentTime,
  } = req.body;

  if (
    !caseNumber ||
    !applicant ||
    !email ||
    !phoneNumber ||
    !address?.street ||
    !address?.city ||
    !address?.zipCode ||
    !description ||
    !category ||
    !incidentDate ||
    !incidentTime
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const record = await Record.create({
      caseNumber,
      applicant,
      email,
      phoneNumber,
      address,
      description,
      category,
      incidentDate,
      incidentTime,
    });
    res.status(201).json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving the record", error: err });
  }
});

// List records
app.get("/api/records", async (_req, res) => {
  try {
    const records = await Record.find();
    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching records" });
  }
});

// ─── QUEUE / DONE ───────────────────────────────────────────────────────────────

// Add to queue
app.post("/queue", async (req, res) => {
  const { subject, description, name, phoneNumber, address } = req.body;
  if (!subject || !description || !name || !phoneNumber || !address) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const q = await Queue.create({
      subject,
      description,
      name,
      phoneNumber,
      address,
    });
    res.status(201).json(q);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving queue item", error: err });
  }
});

// Move queue → done
app.post("/queue/:id/done", async (req, res) => {
  try {
    const q = await Queue.findById(req.params.id);
    if (!q) return res.status(404).json({ message: "Query not found" });

    await Done.create(q.toObject());
    await Queue.findByIdAndDelete(q._id);

    res.json({ message: "Moved to done" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

// List queue
app.get("/queue", async (_req, res) => {
  try {
    const list = await Queue.find();
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching queries" });
  }
});

// List done
app.get("/done", async (_req, res) => {
  try {
    const list = await Done.find();
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching done queries" });
  }
});

// ─── EMPLOYEES ─────────────────────────────────────────────────────────────────

app.get("/api/employees", async (_req, res) => {
  try {
    const emps = await Employee.find();
    res.json(emps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

app.put("/api/employees/:id", async (req, res) => {
  try {
    const update = {
      working: req.body.working,
      status: req.body.status || "present",
      desc: req.body.working === "busy" ? req.body.desc || "" : "",
    };
    const emp = await Employee.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });
    res.json(emp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

// 404 handler
app.use((_, res) => {
  res.status(404).json({ message: "Not Found" });
});

// global error handler
app.use((err, _, res, __) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
});

// Export for Vercel
module.exports = app;
