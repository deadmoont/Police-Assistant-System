import React, { useState } from 'react';
import apiService from '../services/apiService';
import "../styles/App.css";

const FileRecord = ({ category }) => {
  const [caseNumber, setCaseNumber] = useState('');
  const [applicant, setApplicant] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.addFileRecord({
        caseNumber, 
        applicant, 
        phoneNumber, 
        address, 
        description
      });
      setSuccessMessage('Record added successfully');
      setErrorMessage('');
      setCaseNumber('');
      setApplicant('');
      setPhoneNumber('');
      setAddress('');
      setDescription('');
    } catch (error) {
      console.error('Submission error:', error); // Log the error for debugging
      setErrorMessage('Error adding record. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="file-record-container">
      {/* Heading for the form */}
      <h2>Database</h2> 
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Case Number"
          value={caseNumber}
          onChange={(e) => setCaseNumber(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Applicant Name"
          value={applicant}
          onChange={(e) => setApplicant(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          required
        />
        <button type="submit">Add Record</button>
      </form>

      {/* Success or Error Message */}
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default FileRecord;
