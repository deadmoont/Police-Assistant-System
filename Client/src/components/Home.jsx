import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CSS/homepage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom"; // Make sure you import the necessary hooks
import Navbar from "./Navbar";
import Footer from "./Footer";
import Cards from "./Cards";

const Home = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ name: "", email: "" });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email"); // Extract the email from the query param

    axios
      .get("http://localhost:3001/profile", {
        withCredentials: true,
        params: { email },
      })
      .then((response) => {
        setUserData({
          name: response.data.name,
          email: response.data.email,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Use a function for navigation when clicking the profile icon
  const handleProfileClick = () => {
    navigate(`/Profile?email=${userData.email}`);
  };

  const handleDatabaseClick = () => {
    navigate(`/FileRecord`);
  };

  return (
    // <div style={{ backgroundImage: `url(${backgroundImage})` }}>
    <div className="homepage">
      {/* Header */}
      <Navbar handleProfileClick={handleProfileClick} />
      <Cards></Cards>
      <Footer></Footer>
    </div>
  );
};

export default Home;
