import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./CSS/RecordList.css"; // Import the same CSS file to keep the UI consistent

const RecordsList = () => {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecords, setFilteredRecords] = useState([]);

  // State for sort order
  const [sortOrder, setSortOrder] = useState("asc"); // Default to ascending

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/records", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch records");
        }

        const data = await response.json();
        const sortedData = data.sort((a, b) => a.caseNumber - b.caseNumber); // Initial sort
        setRecords(sortedData);
        setFilteredRecords(sortedData); // Set the records on initial load
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };

    fetchRecords();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = records.filter((record) =>
      record.caseNumber.toString().includes(e.target.value.toLowerCase())
    );
    setFilteredRecords(filtered);
  };


  return (
    <>
      <Navbar />
      <div className="records-container">
        <h2>All Complaint Records</h2>

        <input
          type="text"
          placeholder="Search by Case Number"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />


        <div className="records-grid">
          {filteredRecords.length > 0 ? (
            filteredRecords.map((record) => (
              <div key={record._id} className="record-box">
                <h3 className="record-case-number">{record.caseNumber}</h3>
                <p>
                  <strong>Applicant:</strong> {record.applicant}
                </p>
                <p>
                  <strong>Category:</strong> {record.category}
                </p>
                <p>
                  <strong>Date of Incident:</strong> {record.incidentDate}
                </p>
                <p>
                  <strong>Time of Incident:</strong> {record.incidentTime}
                </p>
                <p>
                  <strong>Description:</strong> {record.description}
                </p>
              </div>
            ))
          ) : (
            <p className="empty-message">No records found.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RecordsList;
