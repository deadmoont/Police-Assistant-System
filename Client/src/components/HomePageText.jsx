import React from "react";
import "./CSS/HomePageText.css";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePageText = () => {
  return (
    <div className="container my-5 mybox" style={{ backgroundColor: "white" }}>
      <div className="scrolling-box bg-light text-dark p-3 text-center">
        <p></p>
        <ul className="scrolling-text">
          <li>
            For seeing the live footage of an area kindly go to section Camera
            Monitoring...
          </li>
          <li>
            Mark your attendance at section Staff tracker and see where your
            duty is assigned
          </li>
          <li>
            To submit a person’s report in process, kindly submit the details in
            the Queueing section
          </li>
          <li>
            Add detailed information about an incident in the Database section
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomePageText;
