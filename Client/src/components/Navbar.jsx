import { FaUserCircle } from "react-icons/fa";
import React from "react";
import { Link } from "react-router-dom";
import "./CSS/homepage.css";

function Navbar({ handleProfileClick }) {
  return (
    <header className="p-3 text-bg-dark ">
      <div class="d-flex mb-3 navbarcon">
        <div class="p-2">
          <a href="/" className="">
            <img
              src="../Images/Logo2.svg"
              alt="Logo"
              class="img-fluid"
              width="45" //72
              height="45" //57
            />
          </a>
        </div>
        <div class="p-2">
          <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <li>
                  <a href="#" className="nav-link px-2 text-white navbartext">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="nav-link px-2 text-white navbartext">
                    Camera-Monitoring
                  </a>
                </li>
                <li>
                  <a
                    href="/MemoApp"
                    className="nav-link px-2 text-white navbartext"
                  >
                    Queueing
                  </a>
                </li>
                <li>
                  <a
                    href="/FileRecord"
                    className="nav-link px-2 text-white navbartext"
                  >
                    Database
                  </a>
                </li>
                <li>
                  <a href="#" className="nav-link px-2 text-white navbartext">
                    Staff-Tracker
                  </a>
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
