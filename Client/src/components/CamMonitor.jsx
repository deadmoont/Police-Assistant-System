// App.js or your main component
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Video from "./out.mp4"; // Ensure your video file is in the same directory
import "./CSS/Cam.css"; // Or wherever your styles are located

function App() {
  const [licensePlates, setLicensePlates] = useState([]); // Store the license plate data
  const [lastPlate, setLastPlate] = useState(""); // Store the last identified license plate
  const [currentTime, setCurrentTime] = useState(0); // Track current playback time
  const [displayedPlates, setDisplayedPlates] = useState([]); // Store the plates to display
  const [selectedPlate, setSelectedPlate] = useState(null); // Track the plate that was clicked

  // Mock driver info (same for all plates)
  const driverInfo = {
    name: "John Doe",
    age: 35,
    address: "123 Elm St, Springfield",
    fine: "$500",
    license: "DL1234567",
    violations: ["Speeding", "Red Light Violation"],
  };

  // Street information for the postcard
  const streetInfo = {
    street: "Main St.",
    city: "Springfield",
    state: "IL",
    pincode: "62701",
    cameraZone: "Zone 3",
  };

  // Load CSV data using fetch
  useEffect(() => {
    const fetchCSV = async () => {
      const response = await fetch("car.csv"); // Adjust the path to your CSV file
      const text = await response.text();

      // Parse the CSV text manually (simple method)
      const rows = text.split("\n").slice(1); // Remove header row
      const plates = rows.map((row) => {
        const [license_plate_number, time_added] = row.split(",");
        return { license_plate_number, time_added: parseFloat(time_added) };
      });

      setLicensePlates(plates);
    };

    fetchCSV();
  }, []);

  // Update the current license plate based on video timestamp
  const handleProgress = (progress) => {
    setCurrentTime(progress.playedSeconds);

    // Find the most recent plate based on the current time
    let latestPlate = "";
    for (let i = 0; i < licensePlates.length; i++) {
      if (licensePlates[i].time_added <= currentTime) {
        latestPlate = licensePlates[i].license_plate_number;
      }
    }

    // Update the last plate identified
    setLastPlate(latestPlate);

    // Update the displayed plates (show one plate at a time)
    if (latestPlate && !displayedPlates.includes(latestPlate)) {
      setDisplayedPlates((prevPlates) => [...prevPlates, latestPlate]);
    }
  };

  // Handle clicking on a license plate
  const handlePlateClick = (plate) => {
    setSelectedPlate(plate); // Set the selected plate
  };

  // Close the info panel
  const closePanel = () => {
    setSelectedPlate(null); // Close the panel by resetting selectedPlate
  };

  return (
    <div className="App">
      <div className="video-container">
        <div className="video-side">
          <ReactPlayer
            url={Video}
            playing
            loop
            muted
            className="react-player"
            onProgress={handleProgress}
          />
        </div>

        <div className="plate-side">
          <div className="plate-list">
            {displayedPlates.map((plate, index) => (
              <div
                className={`plate-box ${
                  plate === lastPlate ? "highlight" : ""
                }`}
                key={index}
                onClick={() => handlePlateClick(plate)} // Add click handler
              >
                {plate}
              </div>
            ))}
          </div>

          <div className="last-plate">
            <p>Last Identified Plate: {lastPlate}</p>
          </div>
        </div>

        {/* Speed Limit Violation Heading */}
        <div className="speed-limit-violation">
          <h2>Speed Limit Violation</h2>
        </div>

        {/* Modal Panel for driver information */}
        {selectedPlate && (
          <div className="info-panel">
            <div className="panel-content">
              <h2>Driver Information</h2>
              <p>
                <strong>Name:</strong> {driverInfo.name}
              </p>
              <p>
                <strong>Age:</strong> {driverInfo.age}
              </p>
              <p>
                <strong>Address:</strong> {driverInfo.address}
              </p>
              <p>
                <strong>License Number:</strong> {driverInfo.license}
              </p>
              <p>
                <strong>Fine Amount:</strong> {driverInfo.fine}
              </p>
              <p>
                <strong>Violations:</strong>
              </p>
              <ul>
                {driverInfo.violations.map((violation, index) => (
                  <li key={index}>{violation}</li>
                ))}
              </ul>
              <button className="close-btn" onClick={closePanel}>
                Fine Imposed!
              </button>
            </div>
          </div>
        )}

        {/* Postcard-style Street Info Section */}
        <div className="street-info-card">
          <h3>Street Information</h3>
          <p>
            <strong>Street:</strong> {streetInfo.street}
          </p>
          {/* <p>
            <strong>City:</strong> {streetInfo.city}
          </p> */}
          <p>
            <strong>State:</strong> {streetInfo.state}
          </p>
          <p>
            <strong>Pincode:</strong> {streetInfo.pincode}
          </p>
          <p>
            <strong>Monitoring Zone:</strong> {streetInfo.cameraZone}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
