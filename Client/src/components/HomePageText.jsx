import React from "react";
import "./CSS/HomePageText.css";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePageText = () => {
  return (
    <div className="container my-5 d-flex justify-content-between align-items-start">
      <div className="mybox" style={{ backgroundColor: "white" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          <center style={{ fontSize: "40px" }}>General Instructions</center>
        </h2>
        <div className="scrolling-box bg-light text-dark p-3 text-center">
          <div
            style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}
            className="scrolling-text"
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div className="instruction-box">
                <h3>Camera Monitoring</h3>
                <p>
                  This section provides real-time video feeds from cameras to
                  monitor designated areas, helping you ensure security and
                  track movements effectively.
                </p>
              </div>

              <div className="instruction-box">
                <h3>Staff Tracker</h3>
                <p>
                  Monitor the activities, attendance, and performance of your
                  staff. This section provides detailed logs and reports to help
                  manage team efficiency.
                </p>
              </div>

              <div className="instruction-box">
                <h3>Queueing</h3>
                <p>
                  Organize and manage queues effectively. This section allows
                  you to handle crowd flow, optimize waiting times, and ensure
                  orderly operations.
                </p>
              </div>

              <div className="instruction-box">
                <h3>Database</h3>
                <p>
                  Store and access essential data securely. This section
                  includes records, analytics, and data management tools for
                  easy retrieval and management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mybox2">
        <p className="ptext">
          “Where Technology Meets Trust: Streamlining Police Operations for a
          Safer Tomorrow.”
        </p>
        <br></br>
        <p className="ptext">
          “Building Safer Communities with Advanced Monitoring and Data-Driven
          Insights.”
        </p>
        <br></br>
        <p className="ptext">
          “Reliable. Efficient. Secure. Assisting Law Enforcement in Every
          Step.”
        </p>
      </div>
    </div>
  );
};

export default HomePageText;
