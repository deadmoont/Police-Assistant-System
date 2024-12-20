import { FaUserCircle } from "react-icons/fa";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./CSS/homepage.css";

function Navbar({ handleProfileClick }) {
  const navigate = useNavigate(); // Initialize navigate

  // Handlers for different cards
  const handleDatabaseClick = () => {
    navigate("/FileRecord"); // Navigate to FileRecord component when "Database" card is clicked
  };
  const handleHomeClick = () => {
    navigate("/Home");
  };
  const handleQueueClick = () => {
    navigate("/Queueopener"); // Navigate to MemoApp component when "Queueing" card is clicked
  };
  const handleDepartment = () => {
    navigate("/DepartmentTracker");
  };
  const handleCameraClick = () => {
    navigate("/cam-monitor");
  };
  return (
    <header className="p-3 text-bg-dark overallcon">
      <div class="d-flex mb-3 navbarcon">
        <div class="p-2">
          <a href="/" className="">
            <img
              src="../Images/Logo2.svg"
              alt="Logo"
              class="img-fluid"
              width="80" //72
              height="80" //57
            />
          </a>
        </div>
        <div class="p-2">
          <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <ul
                className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"
                style={{ justifyContent: "space-between", gap: "100px" }}
              >
                <li>
                  <div
                    className="nav-link px-2 text-white navbartext"
                    onClick={handleHomeClick}
                  >
                    Home
                  </div>
                </li>
                <li>
                  <div
                    className="nav-link px-2 text-white navbartext"
                    onClick={handleCameraClick}
                  >
                    Camera-Monitoring
                  </div>
                </li>
                <li>
                  <div
                    className="nav-link px-2 text-white navbartext"
                    onClick={handleQueueClick}
                  >
                    Queueing
                  </div>
                </li>
                <li>
                  <div
                    className="nav-link px-2 text-white navbartext"
                    onClick={handleDatabaseClick}
                  >
                    Database
                  </div>
                </li>
                <li>
                  <div
                    className="nav-link px-2 text-white navbartext"
                    onClick={handleDepartment}
                  >
                    Staff-Tracker
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="ms-auto p-2" onClick={handleProfileClick}>
          <FaUserCircle size={40} />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
