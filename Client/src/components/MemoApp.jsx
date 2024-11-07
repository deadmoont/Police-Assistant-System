import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./CSS/MemoApp.css";
import { useNavigate } from "react-router-dom";

const MemoApp = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    name: "",
    phoneNumber: "",
    address: "",
  });
  const [message, setMessage] = useState(""); // State for success/error message
  const [messageType, setMessageType] = useState(""); // State for message type (success or error)

  // Updates the applications every second
  useEffect(() => {
    const interval = setInterval(() => {
      setApplications([...applications]); // Trigger a re-render to update the duration every second
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [applications]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addApplication = async () => {
    const { subject, description, name, phoneNumber, address } = formData;
    if (
      subject.trim() &&
      description.trim() &&
      name.trim() &&
      phoneNumber.trim() &&
      address.trim()
    ) {
      try {
        const response = await fetch("http://localhost:3001/queue", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            subject,
            description,
            name,
            phoneNumber,
            address,
          }),
        });

        if (response.ok) {
          const newApplication = await response.json();
          setApplications([...applications, newApplication]);
          setFormData({
            subject: "",
            description: "",
            name: "",
            phoneNumber: "",
            address: "",
          });
          setMessage("Application submitted successfully!");
          setMessageType("success"); // Success message type
        } else {
          setMessage("Failed to add application. Please try again.");
          setMessageType("error"); // Error message type
        }
      } catch (error) {
        console.error("Error adding application:", error);
        setMessage("Error submitting application. Please try again.");
        setMessageType("error"); // Error message type
      }
    } else {
      setMessage("Please fill in all fields before submitting.");
      setMessageType("error"); // Validation message type
    }
  };

  return (
    <>
      <Navbar />
      <div className="memo-app">
        <h2 className="app-title">Application Form</h2>
        <div className="input-container">
          <div className="form-group">
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter subject"
              className="memo-input"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="memo-input"
            ></textarea>
          </div>

          <div className="form-group">
            <label>Applicant Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter applicant name"
              className="memo-input"
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="memo-input"
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              className="memo-input"
            />
          </div>

          <button onClick={addApplication} className="save-button">
            Submit Application
          </button>

          {message && (
            <p
              className="submission-message"
              style={{
                color: messageType === "success" ? "green" : "red",
              }}
            >
              {message}
            </p>
          )}
        </div>
        {/* New Buttons */}
        <button onClick={() => navigate("/all-queries")} className="query-button">
            All Queries
          </button>
          <button onClick={() => navigate("/queries-finished")} className="query-button">
            Queries Finished
          </button>
      </div>
      <Footer />
    </>
  );
};

export default MemoApp;
