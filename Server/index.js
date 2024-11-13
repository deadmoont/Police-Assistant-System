const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const FormDataModel = require("./models/FormData");
const Record = require("./models/Record");
const nodemailer = require("nodemailer");
const Queue = require("./models/Queue");
const Done = require("./models/Done");
const Employee = require("./models/Employee");

//const recordRoutes = require('./routes/recordRoutes'); // Import the record routes

const app = express();
const PORT = process.env.PORT || 3001; // Use environment variable for the port or default to 3001

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Front-end origin;
    credentials: true,
  })
);

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://2:2@cluster1.51xt3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process with failure
  });

app.post("/register", (req, res) => {
  const { email, password } = req.body;
  FormDataModel.findOne({ email: email }).then((user) => {
    if (user) {
      res.json("Already registered");
    } else {
      FormDataModel.create(req.body)
        .then((log_reg_form) => res.json(log_reg_form))
        .catch((err) => res.json(err));
    }
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  FormDataModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("Wrong password");
      }
    } else {
      res.json("No records found!");
    }
  });
});

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "grishgautam03@gmail.com", // replace with your email
    pass: "lvfu zcnp njjv bgqh", // replace with your email password
  },
});

// Send OTP
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP

  // Save OTP to user's document in the database
  await FormDataModel.updateOne({ email }, { $set: { otp } });

  const mailOptions = {
    from: "grishgautam03@gmail.com",
    to: email,
    subject: "Password Reset OTP",
    text: `Your OTP for password reset is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: "Error sending OTP", error });
    } else {
      res.status(200).json({ message: "OTP sent to your email!" });
    }
  });
});

// Verify OTP
app.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find the user's document by email
    const user = await FormDataModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the provided OTP matches the one in the database
    if (user.otp === otp) {
      // OTP matches, clear OTP field after successful verification
      await FormDataModel.updateOne({ email }, { $unset: { otp: 1 } });

      return res.status(200).json({ message: "OTP verified successfully" });
    } else {
      return res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error verifying OTP", error });
  }
});

// Change Password
app.post("/change-password", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Update the user's password in the database
    await FormDataModel.updateOne({ email }, { password: newPassword });

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating password", error });
  }
});

/// Record POST Route
// app.post("/api/records", async (req, res) => {
//   const {
//     caseNumber,
//     fullName,
//     phoneNumber,
//     email,
//     description,
//     category,
//     incidentDate,
//     incidentTime,
//   } = req.body;

//   if (
//     !caseNumber ||
//     !fullName ||
//     !phoneNumber ||
//     !email ||
//     !description ||
//     !category ||
//     !incidentDate ||
//     !incidentTime
//   ) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   try {
//     const newRecord = new Record({
//       caseNumber,
//       fullName,
//       phoneNumber,
//       email,
//       description,
//       category,
//       incidentDate,
//       incidentTime,
//     });

//     const savedRecord = await newRecord.save();
//     res.status(201).json(savedRecord);
//   } catch (err) {
//     console.error("Error adding record:", err);
//     res
//       .status(500)
//       .json({ message: "Error saving the record", error: err.message });
//   }
// });
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

  // Validate required fields, including nested address fields
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
    const newRecord = new Record({
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

    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (err) {
    console.error("Error adding record:", err);
    res
      .status(500)
      .json({ message: "Error saving the record", error: err.message });
  }
});

//Queue part handle

app.post("/queue", async (req, res) => {
  const { subject, description, name, phoneNumber, address } = req.body;

  if (!subject || !description || !name || !phoneNumber || !address) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newQueueItem = new Queue({
      subject,
      description,
      name,
      phoneNumber,
      address,
    });
    const savedQueueItem = await newQueueItem.save();
    res.status(201).json(savedQueueItem);
  } catch (error) {
    console.error("Error saving queue item:", error);
    res
      .status(500)
      .json({ message: "Error saving the queue item", error: error.message });
  }
});
app.post("/queue/:id/done", async (req, res) => {
  try {
    const queryId = req.params.id;
    const query = await Queue.findById(queryId);

    if (!query) {
      return res.status(404).json({ error: "Query not found" });
    }

    // Add query to 'done' collection
    const doneQuery = new Done(query.toObject());
    await doneQuery.save();

    // Remove query from 'queues' collection
    await Queue.findByIdAndDelete(queryId);

    res.status(200).json({ message: "Query moved to done" });
  } catch (error) {
    console.error("Error moving query to done:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/queue", async (req, res) => {
  try {
    const queries = await Queue.find(); // Fetch all queries from the database
    res.status(200).json(queries); // Respond with the list of queries
  } catch (error) {
    console.error("Error fetching queries:", error);
    res
      .status(500)
      .json({ message: "Error fetching queries", error: error.message });
  }
});

app.get("/done", async (req, res) => {
  try {
    const doneQueries = await Done.find();
    res.status(200).json(doneQueries);
  } catch (error) {
    console.error("Error fetching done queries:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/api/employees/:id", async (req, res) => {
  try {
    const updateData = {
      working: req.body.working,
      status: req.body.status || "present", // Add status update if provided
    };

    if (req.body.working === "busy") {
      updateData.desc = req.body.desc || "No description provided";
    } else {
      updateData.desc = "";
    }

    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json(employee);
  } catch (error) {
    res.status(500).send(error);
  }
});
// Handle 404 - Not Found
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
