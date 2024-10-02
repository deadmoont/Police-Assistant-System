// // back/routes/recordRoutes.js
// const express = require("express");
// const Record = require("../models/Record");
// const router = express.Router();

// // POST route to add a new record
// router.post("/", async (req, res) => {
//   const { caseNumber, applicant, phoneNumber, address, description, category } =
//     req.body;

//   // Basic validation for required fields
//   if (
//     !caseNumber ||
//     !applicant ||
//     !phoneNumber ||
//     !address ||
//     !description ||
//     !category
//   ) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   try {
//     const newRecord = new Record({
//       caseNumber,
//       applicant,
//       phoneNumber,
//       address,
//       description,
//       category,
//     });

//     const savedRecord = await newRecord.save(); // Save the record to the database
//     res.status(201).json(savedRecord); // Respond with the created record
//   } catch (err) {
//     console.error("Error adding record:", err);
//     res
//       .status(500)
//       .json({ message: "Error saving the record", error: err.message });
//   }
// });

// module.exports = router;
