import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CSS/homepage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import backgroundImage from "../assets/Background1.jpg";

import { Link, useNavigate } from "react-router-dom"; // Make sure you import the necessary hooks
import Navbar from "./Navbar";
import Footer from "./Footer";

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
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };
  return (
    // <div style={{ backgroundImage: `url(${backgroundImage})` }}>
    <div className="homepage">
      {/* Header */}
      <Navbar handleProfileClick={handleProfileClick} />

      {/* Main Section */}
      <main>
        <Slider {...settings}>
          <div className="section">
            <a href="CameraMonitoring.html">
              <h2>Camera Monitoring</h2>
            </a>
            <img src="../Images/camera.jpg" alt="Camera Monitoring" />
          </div>

          <div className="section">
            <a href="Queueing.html">
              <h2>Queueing</h2>
            </a>
            <img src="../Images/Queue.jpg" alt="Queueing" />
          </div>

          <div
            className="section"
            onClick={handleDatabaseClick}
            style={{ cursor: "pointer" }}
          >
            <h2>Database</h2>
            <img src="../Images/database.png" alt="Database" />
          </div>

          <div className="section">
            <a href="DepartmentTracker.html">
              <h2>Department Tracker</h2>
            </a>
            <img src="../Images/Tracker.jpg" alt="Department Tracker" />
          </div>
        </Slider>
      </main>

      {/* Footer
      <footer>
        <p>
          &copy; 2024 Police Department Assistance System. All Rights Reserved.
        </p>
      </footer> */}
      <Footer></Footer>
    </div>
  );
};

export default Home;