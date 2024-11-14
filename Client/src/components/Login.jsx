import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CSS/Login.css"; // Assuming you'll move the CSS to a separate file called Login.css

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3001/login", { email, password })
      .then((result) => {
        if (result.data === "Success") {
          alert("Login successful!");
          navigate(`/Home?email=${email}`);
        } else {
          alert("Incorrect password! Please try again.");
        }
      })
      .catch((err) => console.log(err));
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <img src="../Images/Logo2.svg" alt="Mailchimp Logo" />
        </div>
        
          <h2>
            <center> <strong>Log in</strong></center></h2>
        

        <form onSubmit={handleSubmit}>
          <div className="password-container">
            <label htmlFor="exampleInputEmail1">Email</label>
            {/* <input type="text" id="username" name="username" /> */}
            <input
              type="email"
              placeholder="Enter Email"
              id="exampleInputEmail1"
              className="form-control"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <label htmlFor="exampleInputPassword1">Password</label>
          <div className="password-container">
            {/* <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
            /> */}
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <span
              className="show-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <div className="login-options">
            <input type="checkbox" id="keep-logged-in" />
            <label htmlFor="keep-logged-in">Keep me logged in</label>
          </div>

          <button type="submit" className="login-btn">
            Log in
          </button>
          <p style={{marginTop:"20px"}}>
            Need a PDAS account?
            <Link to="/register">Create an account</Link>
          </p>
          <div className="help-links">
            {/* <a href="/forgot-username">Forgot username?</a> */}
            {/* <a href="/forgot-password">Forgot password?</a> */}
            <Link to="/Forgotpassword">Forgot Password?</Link>
            {/* <a href="/cant-login">Can't log in?</a> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
