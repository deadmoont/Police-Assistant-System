import React, { useState, useEffect } from "react";
import "./CSS/AllQueries.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AllQueries = () => {
  const [queries, setQueries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredQueries, setFilteredQueries] = useState([]);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await fetch("http://localhost:3001/queue");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setQueries(data);
        setFilteredQueries(data);
      } catch (error) {
        console.error("Error fetching queries:", error);
      }
    };

    fetchQueries();
  }, []);

  const handleDone = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/queue/${id}/done`, {
        method: "POST",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to move query to done");
      }

      setQueries((prevQueries) => prevQueries.filter((query) => query._id !== id));
      setFilteredQueries((prevQueries) => prevQueries.filter((query) => query._id !== id));
    } catch (error) {
      console.error("Error moving query to done:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = queries.filter((query) =>
      query.phoneNumber.includes(e.target.value)
    );
    setFilteredQueries(filtered);
  };

  return (
    <div>
      <Navbar />
      <div className="memos-container">
        <h2>All Queries</h2>
        
        <input
          type="text"
          placeholder="Search by Phone Number"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        
        <div className="memo-grid">
          {filteredQueries.length > 0 ? (
            filteredQueries.map((query, index) => (
              <div key={query._id} className="memo-box">
                <h3 className="queue1">{index + 1}</h3>
                <h3 className="heading1">Subject: {query.subject}</h3>
                <p className="bolder"> <strong>Description:</strong> {query.description}</p>
                <p className="bolder"> <strong>Applicant Name:</strong> {query.name}</p>
                <p className="bolder"><strong>Phone Number:</strong> {query.phoneNumber}</p>
                <p className="bolder"><strong>Address:</strong> {query.address}</p>
                <button className="done-btn" onClick={() => handleDone(query._id)}>
                  Mark as Done
                </button>
              </div>
            ))
          ) : (
            <p className="empty-message">No queries available.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllQueries;
