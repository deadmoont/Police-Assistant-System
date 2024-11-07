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

  useEffect(() => {
    const interval = setInterval(() => {
      setApplications([...applications]);
    }, 1000);
    return () => clearInterval(interval);
  }, [applications]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addApplication = async () => {
    const { subject, description, name, phoneNumber, address } = formData;

    if (!subject.trim() || !description.trim() || !name.trim() || !phoneNumber.trim() || !address.trim()) {
      setMessage("Please fill in all fields before submitting.");
      setMessageType("error");
      return;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      setMessage("Phone number must be exactly 10 digits.");
      setMessageType("error");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/queue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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
        setMessageType("success");
      } else {
        setMessage("Failed to add application. Please try again.");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error adding application:", error);
      setMessage("Error submitting application. Please try again.");
      setMessageType("error");
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
              required
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
              required
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
              required
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
              required
              pattern="\d{10}" // Regex for 10 digits
              title="Phone number must be exactly 10 digits."
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
              required
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
      </div>
      <Footer />
    </>
  );
};

export default MemoApp;
