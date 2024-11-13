import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CSS/homepage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom"; // Make sure you import the necessary hooks
import Navbar from "./Navbar";
import Footer from "./Footer";
import Cards from "./Cards";
import HomePageText from "./HomePageText";
import Announcements from "./Announcements";

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
    navigate(`/FileRecord`); // Navigate to the FileRecord component when the database icon is clicked
  };

  return (
    <div className="homepage">
      {/* Header */}
      <Navbar handleProfileClick={handleProfileClick} />

      {/* Add a button or icon for database navigation */}

      <Cards />
<<<<<<< HEAD
      <Announcements />
      <HomePageText />
=======
     
>>>>>>> ec1ae14e79d8cf6161ef51771bf2e0e40df3f99f
      <Footer />
    </div>
  );
};

export default Home;
