// // import React, { useState } from "react";
// // import apiService from "../services/apiService";
// // import "../styles/App.css";
// // import "./CSS/FileRecord.css";
// // import SubNavbar from "./SubNavbar"; // Import SubNavbar
// // import Navbar from "./Navbar";
// // import Footer from "./Footer";

// // const categories = ["Theft", "Assault", "Fraud", "Missing Persons"]; // Define categories

// // const FileRecord = () => {
// //   const [caseNumber, setCaseNumber] = useState("");
// //   const [applicant, setApplicant] = useState("");
// //   const [phoneNumber, setPhoneNumber] = useState("");
// //   const [address, setAddress] = useState("");
// //   const [description, setDescription] = useState("");
// //   const [successMessage, setSuccessMessage] = useState("");
// //   const [errorMessage, setErrorMessage] = useState("");
// //   const [selectedCategory, setSelectedCategory] = useState("Theft"); // Track the selected category

// //   const handleCategoryClick = (category) => {
// //     setSelectedCategory(category); // Update selected category
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await apiService.addFileRecord({
// //         caseNumber,
// //         applicant,
// //         phoneNumber,
// //         address,
// //         description,
// //         category: selectedCategory,
// //       });
// //       setSuccessMessage("Record added successfully");
// //       setErrorMessage("");
// //       setCaseNumber("");
// //       setApplicant("");
// //       setPhoneNumber("");
// //       setAddress("");
// //       setDescription("");
// //     } catch (error) {
// //       setErrorMessage("Error adding record. Please try again.");
// //       setSuccessMessage("");
// //     }
// //   };

// //   const handleProfileClick = () => {
// //     navigate(`/Profile?email=${userData.email}`);
// //   };

// //   return (
// //     <>
// //       <Navbar handleProfileClick={handleProfileClick} />

// //       <div className="file-record-container">
// //         {/* SubNavbar for category selection */}
// //         <SubNavbar
// //           categories={categories}
// //           selectedCategory={selectedCategory}
// //           setSelectedCategory={handleCategoryClick}
// //         />

// //         {/* Dynamic content based on selected category */}
// //         {/* <div className="category-content"> */}
// //         <h2>{selectedCategory}</h2>
// //         <p>
// //           {selectedCategory === "Theft" &&
// //             "Details and guidelines related to theft cases."}
// //           {selectedCategory === "Assault" &&
// //             "Information regarding assault cases and procedures."}
// //           {selectedCategory === "Fraud" &&
// //             "Steps and regulations for handling fraud-related cases."}
// //           {selectedCategory === "Missing Persons" &&
// //             "Instructions for missing persons case management."}
// //         </p>
// //         {/* </div> */}

// //         {/* Form to file a record */}
// //         <form onSubmit={handleSubmit} className="file-record-form">{/*file-record-form*/}
// //           <p className="ptext">Case Number:</p>
// //           <input
// //             type="text"
// //             // placeholder="Case Number"
// //             value={caseNumber}
// //             onChange={(e) => setCaseNumber(e.target.value)}
// //             required
// //           />
// //           Applicant Name:
// //           <input
// //             type="text"
// //             // placeholder="Applicant Name"
// //             value={applicant}
// //             onChange={(e) => setApplicant(e.target.value)}
// //             required
// //           />
// //           Phone Number:
// //           <input
// //             type="text"
// //             // placeholder="Phone Number"
// //             value={phoneNumber}
// //             onChange={(e) => setPhoneNumber(e.target.value)}
// //             required
// //           />
// //           Address:
// //           <input
// //             type="text"
// //             // placeholder="Address"
// //             value={address}
// //             onChange={(e) => setAddress(e.target.value)}
// //             required
// //           />
// //           Description:
// //           <textarea
// //             // placeholder="Description"
// //             value={description}
// //             onChange={(e) => setDescription(e.target.value)}
// //             rows="4"
// //             required
// //           />
// //           <button type="submit">Add Record</button>
// //         </form>

// //         {/* Success/Error messages */}
// //         {successMessage && (
// //           <div className="success-message">{successMessage}</div>
// //         )}
// //         {errorMessage && <div className="error-message">{errorMessage}</div>}
// //       </div>

// //       <Footer></Footer>
// //     </>
// //   );
// // };

// // export default FileRecord;

import React, { useState } from "react";
import apiService from "../services/apiService";
// import "../styles/App.css";
import "./CSS/FileRecord.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const categories = ["Theft", "Assault", "Fraud", "Missing Persons"]; // Define categories

const FileRecord = () => {
  const [caseNumber, setCaseNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState({ street: "", city: "", zipCode: "" });
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Theft");
  const [incidentDate, setIncidentDate] = useState("");
  const [incidentTime, setIncidentTime] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
     const formData = {
    caseNumber,
    fullName,
    phoneNumber,
    email,
    address: JSON.stringify(address), // make sure address is a JSON string
    description,
    category: selectedCategory,
    incidentDate,
    incidentTime,
  };

  console.log("FormData being sent:", formData); // Log formData
    try {
      const formData = new FormData();
      formData.append("caseNumber", caseNumber);
      formData.append("fullName", fullName);
      formData.append("phoneNumber", phoneNumber);
      formData.append("email", email);
      formData.append("address", JSON.stringify(address));
      formData.append("description", description);
      formData.append("category", selectedCategory);
      formData.append("incidentDate", incidentDate);
      formData.append("incidentTime", incidentTime);

      await apiService.addFileRecord(formData); 
      setSuccessMessage("Record added successfully");
      setErrorMessage("");
      // Reset fields after successful submission
      setCaseNumber("");
      setFullName("");
      setPhoneNumber("");
      setEmail("");
      setAddress({ street: "", city: "", zipCode: "" });
      setDescription("");
      setIncidentDate("");
      setIncidentTime("");
    } catch (error) {
      setErrorMessage("Error adding record. Please try again.");
      setSuccessMessage("");
    }
  };

  // const [gender, setGender] = useState(""); // Initialize gender state
  return (
    <>
      <Navbar />

      <div className="edit-details-container">
        <h2>Complaint Details</h2>
        <form onSubmit={handleSubmit} className="edit-details-form">
          <div className="form-row">
            <div className="form-group">
              <label>Case Number:</label>
              <input
                type="text"
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
              />
            </div>
          </div>
          <div className="form-group">
            <label>Full Name:</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
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
                type="text"
                placeholder="Zip Code"
                value={address.zipCode}
                onChange={(e) =>
                  setAddress({ ...address, zipCode: e.target.value })
                }
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
          <div className="form-row">
            <div className="form-group">
              <label>Date of Incident:</label>
              <input
                type="date"
                value={incidentDate}
                onChange={(e) => setIncidentDate(e.target.value)}
                required
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
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>

      <Footer />
    </>
  );
};

export default FileRecord;
