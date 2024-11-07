import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./CSS/Register.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [favoritePet, setFavoritePet] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Password validation: at least 8 characters and contains at least one special character
    const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!passwordRegex.test(password)) {
      alert(
        "Password must be at least 8 characters long and contain at least one special symbol."
      );
      return;
    }

    axios
      .post("http://localhost:3001/register", {
        name,
        email,
        password,
        favoritePet,
      }) // Send favoritePet
      .then((result) => {
        console.log(result);
        if (result.data === "Already registered") {
          alert("E-mail already registered! Please Login to proceed.");
          navigate("/login");
        } else {
          alert("Registered successfully! Please Login to proceed.");
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="registration-container">
      <div className="form-box">
        <h2>
          <strong>Register</strong>
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label htmlFor="exampleInputName" className="form-label">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              id="exampleInputName"
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="exampleInputEmail1" className="form-label">
              <strong>Email Id</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              id="exampleInputEmail1"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="exampleInputPassword1" className="form-label">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <div id="passwordHelpBlock" className="form-text">
              Your password must be 8-20 characters long and contain at least
              one special character.
            </div>
          </div>
          {/* Uncomment this if you want to include favoritePet field */}
          {/* 
                    <div className="mb-3 text-start">
                        <label htmlFor="favoritePet" className="form-label">
                            <strong>Your Favorite Pet</strong>
                        </label>
                        <input 
                            type="text" 
                            placeholder="Enter Your Favorite Pet"
                            className="form-control" 
                            id="favoritePet" 
                            onChange={(event) => setFavoritePet(event.target.value)}
                            required
                        />
                    </div>
                    */}
          <button type="submit" className="btn">
            Register
          </button>
        </form>
   <div className="help-links">
   <Link to="/login" >
        Already have an account?
        </Link>
   </div>
      
        
      </div>
    </div>
  );
};

export default Register;
