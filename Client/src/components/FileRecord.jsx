import React, { useState } from "react";
import apiService from "../services/apiService";
// import "../styles/App.css";
import "./CSS/FileRecord.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const categories = ["Theft", "Assault", "Fraud", "Missing Persons"]; // Define categories

const FileRecord = () => {
  const navigate = useNavigate();
  const [caseNumber, setCaseNumber] = useState("");
  const [applicant, setApplicant] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState({ street: "", city: "", zipCode: "" });
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Theft");
  const [incidentDate, setIncidentDate] = useState("");
  const [incidentTime, setIncidentTime] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const handleRecordListClick = () => {
    // Navigate to the MemoApp page when the button is clicked
    navigate("/record-list");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const structuredAddress = {
      street: address.street || "",
      city: address.city || "",
      zipCode: address.zipCode || "",
    };
    try {
      await apiService.addFileRecord({
        caseNumber,
        applicant,
        email,
        phoneNumber,
        address: structuredAddress,
        description,
        category: selectedCategory,
        incidentDate,
        incidentTime,
      });
  
      // Show success alert
      setSuccessMessage("Record added successfully");
  
      // Clear form and state
      setCaseNumber("");
      setApplicant("");
      setEmail("");
      setPhoneNumber("");
      setAddress({ street: "", city: "", zipCode: "" });
      setDescription("");
      setIncidentDate("");
      setIncidentTime("");
      setSuccessMessage("");
      setErrorMessage("");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // Show alert for duplicate case number
        alert("This case number already exists in the database.");
      } else {
        // Show alert for other errors
        alert("Try different case number");
      }
    }
  };
  
  // const [gender, setGender] = useState(""); // Initialize gender state
  return (
    <>
      <Navbar />

      <div className="edit-details-container">
        <div className="allrecordsview">
        <h2>Complaint Details

        <button class="FRbtn" onClick={handleRecordListClick}>View all Records</button>
</h2>

        </div>
     
      
      <form onSubmit={handleSubmit} className="edit-details-form">
        <div className="form-row">
          <div className="form-group">
            <label>Case Number:</label>
            <input
              type="number"
              value={caseNumber}
              onChange={(e) => setCaseNumber(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              minLength="10"
              maxLength="10"
              pattern="\d{10}"

            />
          </div>
        </div>

        <div className="form-group">
          <label>Full Name:</label>
          <input
            type="text"
            value={applicant}
            onChange={(e) => setApplicant(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-row address-group">
            <div className="form-group">
              <label>Street:</label>
              <input
                type="text"
                placeholder="Street"
                value={address.street}
                onChange={(e) =>
                  setAddress({ ...address, street: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label>City:</label>
              <input
                type="text"
                placeholder="City"
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Zip Code:</label>
              <input
                type="number"
                placeholder="Zip Code"
                value={address.zipCode}
                onChange={(e) =>
                  setAddress({ ...address, zipCode: e.target.value })
                }
                required
                minLength="6"
                maxLength="6"
                pattern="\d{6}"

              />
            </div>
          </div>

         <div className="form-row">
            <div className="form-group">
              <label>Date of Incident:</label>
              <input
                type="date"
                value={incidentDate}
                onChange={(e) => setIncidentDate(e.target.value)}
                required
                max={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className="form-group">
              <label>Time of Incident:</label>
              <input
                type="time"
                value={incidentTime}
                onChange={(e) => setIncidentTime(e.target.value)}
                required
              />
            </div>
          </div>

        <div className="form-group">
          <label>Complaint Type:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Description of Incident:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            required
          />
        </div>

        <button type="submit" className="save-button">
          Add Record
        </button>
      </form>

      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>

      <Footer />
    </>
  );
};

export default FileRecord;
