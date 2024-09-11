const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const FormDataModel = require ('./models/FormData');

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',  // Front-end origin
    credentials: true  // Allow credentials
}));

mongoose.connect('mongodb+srv://2:2@cluster1.51xt3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1');

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
    const { email, favoritePet, newPassword } = req.body;
    FormDataModel.findOne({ email: email })
    .then(user => {
        if (user) {
            if (user.favoritePet === favoritePet) {
                user.password = newPassword;
                user.save()
                .then(() => res.json("Password updated"))
                .catch(err => res.json(err));
            } else {
                res.json("Incorrect favorite pet");
            }
        } else {
            res.json("No records found");
        }
    })
    .catch(err => res.json(err));
});

app.get('/profile', (req, res) => {
    const email = req.query.email; // Assuming the email is passed from the front-end
    FormDataModel.findOne({ email: email })
        .then(user => {
            if (user) {
                res.json({ name: user.name, email: user.email }); // Send user data
            } else {
                res.status(404).json("User not found");
            }
        })
        .catch(err => res.status(500).json(err));
});


app.post('/change-password', (req, res) => {
    const { email, currentPassword, newPassword } = req.body;

    FormDataModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === currentPassword) {
                    user.password = newPassword;
                    user.save()
                        .then(() => res.json("Password changed successfully!"))
                        .catch(err => res.status(500).json(err));
                } else {
                    res.status(400).json("Current password is incorrect.");
                }
            } else {
                res.status(404).json("User not found.");
            }
        })
        .catch(err => res.status(500).json(err));
});


app.listen(3001, () => {
    console.log("Server listening on http://127.0.0.1:3001");
});
