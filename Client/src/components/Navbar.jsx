import logo from "../../public/Images/logo.jpg";
import emblem from "../../public/Images/Emblem.png";
import { HiOutlineBars4 } from "react-icons/hi2";
import { IoMdContact } from "react-icons/io";
import React from "react";
import { Link } from "react-router-dom";
// const handleProfileClick = () => {
//   console.log("profile is clicked!!");
// };

function Navbar({ handleProfileClick }) {
  return (
    <>
      <nav
        className="navbar bg-body-tertiary fixed-top"
        style={{ padding: "0" }}
      >
        <div
          className="container-fluid"
          style={{ backgroundColor: "#113a4e", height: "5rem" }}
        >
          <img src={emblem} style={{ width: "5rem", height: "5rem" }} alt="" />
          <img src={logo} style={{ width: "6rem", height: "5rem" }} alt="" />

          <div style={{ display: "flex" }}>
            <div className="edit-profile" onClick={handleProfileClick}>
              <IoMdContact style={{ color: "white", fontSize: "50px" }} />
            </div>

            <button
              className="navbar-toggler"
              style={{ border: "none" }}
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
              aria-label="Toggle navigation"
            >
              <span>
                <HiOutlineBars4
                  style={{ color: "goldenrod", fontSize: "40px" }}
                />
              </span>
            </button>
          </div>

          <div
            className="offcanvas offcanvas-end"
            tabindex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                More Options
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="Home.jsx"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Camera Monitoring
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Queuing
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Database
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Department Tracker
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
