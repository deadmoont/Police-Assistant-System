const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const FormDataModel = require ('./Models/FormData');
const Record = require('./models/Record');
//const recordRoutes = require('./routes/recordRoutes'); // Import the record routes

const app = express();
const PORT = process.env.PORT || 3001; // Use environment variable for the port or default to 3001

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',  // Front-end origin
}));

// MongoDB connection
mongoose.connect('mongodb+srv://2:2@cluster1.51xt3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1')
    .then(() => console.log("MongoDB connected"))
    .catch(err => {
        console.error("MongoDB connection error:", err);
        process.exit(1); // Exit process with failure
    });

    app.post('/register', (req, res)=>{
        const {email, password, favoritePet} = req.body;
        FormDataModel.findOne({email: email})
        .then(user => {
            if(user){
                res.json("Already registered");
            }
            else{
                FormDataModel.create(req.body)
                .then(log_reg_form => res.json(log_reg_form))
                .catch(err => res.json(err));
            }
        });
    });
    
    app.post('/login', (req, res)=>{
        const {email, password} = req.body;
        FormDataModel.findOne({email: email})
        .then(user => {
            if(user){
                if(user.password === password) {
                    res.json("Success");
                }
                else{
                    res.json("Wrong password");
                }
            }
            else{
                res.json("No records found!");
            }
        });
    });
app.post('/forgot-password', (req, res) => {
    // Add forgot-password logic here
});

// app.get('/profile', (req, res) => {
//     const email = req.query.email; // Assuming the email is passed from the front-end
//     FormDataModel.findOne({ email })
//         .then(user => {
//             if (user) {
//                 res.json({ name: user.name, email: user.email });
//             } else {
//                 res.status(404).json("User not found");
//             }
//         })
//         .catch(err => res.status(500).json(err));
// });

// app.post('/change-password', (req, res) => {
//     const { email, currentPassword, newPassword } = req.body;
//     FormDataModel.findOne({ email })
//         .then(user => {
//             if (user) {
//                 if (user.password === currentPassword) {
//                     user.password = newPassword;
//                     user.save()
//                         .then(() => res.json("Password changed successfully!"))
//                         .catch(err => res.status(500).json(err));
//                 } else {
//                     res.status(400).json("Current password is incorrect.");
//                 }
//             } else {
//                 res.status(404).json("User not found.");
//             }
//         })
//         .catch(err => res.status(500).json(err));
// });

/// Record POST Route
app.post('/api/records', async (req, res) => {
    const { caseNumber, applicant, phoneNumber, address, description } = req.body;

    // Basic validation for required fields
    if (!caseNumber || !applicant || !phoneNumber || !address || !description ) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newRecord = new Record({
            caseNumber,
            applicant,
            phoneNumber,
            address,
            description,
        });

        const savedRecord = await newRecord.save(); // Save the record to the database
        res.status(201).json(savedRecord); // Respond with the created record
    } catch (err) {
        console.error("Error adding record:", err);
        res.status(500).json({ message: "Error saving the record", error: err.message });
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