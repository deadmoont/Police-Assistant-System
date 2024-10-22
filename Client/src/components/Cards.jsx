import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./CSS/homepage.css";

const Cards = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleDatabaseClick = () => {
    navigate("/FileRecord"); // Navigate to FileRecord component when "Database" card is clicked
  };

  return (
    <div className="row big-box">
      <div className="mycard" style={{ width: "18rem" }}>
        <img
          src="../Images/CameraFoo.svg"
          className="card-img-top"
          alt="Camera Monitoring"
          style={{ height: "18rem" }}
        />
        <div className="card-body">
          <p className="card-text myfont">Camera Monitoring</p>
        </div>
      </div>
      <div className="mycard" style={{ width: "18rem" }}>
        <img
          src="../Images/TrackerOri.svg"
          className="card-img-top trackerimg"
          alt="Staff Tracker"
          style={{ height: "18rem" }}
        />
        <div className="card-body">
          <p className="card-text myfont">Staff Tracker</p>
        </div>
      </div>
      <div className="mycard" style={{ width: "17rem" }}>
        <img
          src="../Images/Queue.svg"
          className="card-img-top"
          alt="Queueing"
          style={{ height: "18rem" }}
        />
        <div className="card-body card-text">
          <p className="card-text myfont">Queueing</p>
        </div>
      </div>
      {/* Database Card with onClick event */}
      <div
        className="mycard"
        style={{ width: "17rem" }}
        onClick={handleDatabaseClick}
      >
        {" "}
        {/* Add onClick */}
        <img
          src="../Images/Database.svg"
          className="card-img-top"
          alt="Database"
          style={{ height: "18rem" }}
        />
        <div className="card-body">
          <p className="card-text myfont">Database</p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
  