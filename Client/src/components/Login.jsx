// // import { useState } from 'react';
// // import { Link, useNavigate } from "react-router-dom";
// // import axios from 'axios';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import './CSS/Login.css'; // Assuming you'll move the CSS to a separate file called Login.css

// // const Login = () => {
// //     const [email, setEmail] = useState('');
// //     const [password, setPassword] = useState('');
// //     const navigate = useNavigate();

// //     const handleSubmit = (event) => {
// //         event.preventDefault();

// //         axios.post('http://localhost:3001/login', { email, password })
// //             .then(result => {
// //                 if (result.data === "Success") {
// //                     alert('Login successful!');
// //                     navigate(`/Home?email=${email}`); // Pass the email to Profile
// //                 } else {
// //                     alert('Incorrect password! Please try again.');
// //                 }
// //             })
// //             .catch(err => console.log(err));
// //     };

// //     return (
// //         <div className="login-container">
// //             <div className="form-box">
// //                 <h2 className="text-primary"><strong>Login</strong></h2>
// //                 <form onSubmit={handleSubmit}>
// //                     <div className="mb-3 text-start">
// //                         <label htmlFor="exampleInputEmail1" className="form-label"><strong>Email</strong></label>
// //                         <input
// //                             type="email"
// //                             placeholder="Enter Email"
// //                             className="form-control"
// //                             id="exampleInputEmail1"
// //                             onChange={(event) => setEmail(event.target.value)}
// //                             required
// //                         />
// //                     </div>

// //                     <div className="mb-3 text-start">
// //                         <label htmlFor="exampleInputPassword1" className="form-label"><strong>Password</strong></label>
// //                         <input
// //                             type="password"
// //                             placeholder="Enter Password"
// //                             className="form-control"
// //                             id="exampleInputPassword1"
// //                             onChange={(event) => setPassword(event.target.value)}
// //                             required
// //                         />
// //                     </div>
// //                     <button type="submit" className="btn btn-primary">Login</button>
// //                 </form>
// //                 <p className="mt-3">
// //                     <Link to="/Forgotpassword" className="text-secondary">Forgot Password?</Link>
// //                 </p>
// //                 <p className="container my-2">Don't have an account?</p>
// //                 <Link to='/register' className="btn btn-secondary">Register</Link>
// //             </div>
// //         </div>
// //     );
// // };

// // export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/Login.css'; // Assuming you'll move the CSS to a separate file called Login.css

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
          navigate(`/Home?email=${email}`); // Pass the email to Profile
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
        <h2>Log in</h2>
        <p>
          Need a PDAS account?
          {/* /*<a href="/signup">Create an account</a>*/}
          {/* <Link to='/register' ">Create an account</Link> */}
          <Link to="/register">Create an account</Link>
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="exampleInputEmail1">Email</label>
          {/* <input type="text" id="username" name="username" /> */}
          <input
            type="email"
            placeholder="Enter Email"
           
            id="exampleInputEmail1"
            onChange={(event) => setEmail(event.target.value)}
            required
          />

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
