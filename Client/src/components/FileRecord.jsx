import React, { useState } from 'react';
import apiService from '../services/apiService';
import '../styles/App.css';
import SubNavbar from './SubNavbar'; // Import SubNavbar
import Navbar from "./Navbar";
import Footer from './Footer';

const categories = ["Theft", "Assault", "Fraud", "Missing Persons"]; // Define categories

const FileRecord = () => {
  const [caseNumber, setCaseNumber] = useState('');
  const [applicant, setApplicant] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState("Theft"); // Track the selected category

  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // Update selected category
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.addFileRecord({
        caseNumber,
        applicant,
        phoneNumber,
        address,
        description,
        category: selectedCategory
      });
      setSuccessMessage('Record added successfully');
      setErrorMessage('');
      setCaseNumber('');
      setApplicant('');
      setPhoneNumber('');
      setAddress('');
      setDescription('');
    } catch (error) {
      setErrorMessage('Error adding record. Please try again.');
      setSuccessMessage('');
    }
  };
 
  const handleProfileClick = () => {
    navigate(`/Profile?email=${userData.email}`);
  };

  return (
    <> 
     
     
     <Navbar handleProfileClick={handleProfileClick} />
      
     <div className="file-record-container">
    
       
    {/* SubNavbar for category selection */}
    <SubNavbar
      categories={categories}
      selectedCategory={selectedCategory}
      setSelectedCategory={handleCategoryClick}
    />

    {/* Dynamic content based on selected category */}
    {/* <div className="category-content"> */}
      <h2 >{selectedCategory}</h2>
      <p>
        {selectedCategory === "Theft" && "Details and guidelines related to theft cases."}
        {selectedCategory === "Assault" && "Information regarding assault cases and procedures."}
        {selectedCategory === "Fraud" && "Steps and regulations for handling fraud-related cases."}
        {selectedCategory === "Missing Persons" && "Instructions for missing persons case management."}
      </p>
    {/* </div> */}

    {/* Form to file a record */}
    <form onSubmit={handleSubmit} className="file-record-form">
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

    {/* Success/Error messages */}
    {successMessage && <div className="success-message">{successMessage}</div>}
    {errorMessage && <div className="error-message">{errorMessage}</div>}
  </div>

     <Footer></Footer>
     
    </>
  
  );
};

export default FileRecord;
