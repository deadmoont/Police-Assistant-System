import React, { useState, useEffect } from "react";
import "./CSS/AllQueries.css"; // Import the CSS file for styling

const AllQueries = () => {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await fetch("http://localhost:3001/queue");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setQueries(data);
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
  
      setQueries(queries.filter((query) => query._id !== id));
    } catch (error) {
      console.error("Error moving query to done:", error);
      alert(`Error: ${error.message}`);
    }
  };
  
  
  

  return (
    <div className="memos-container">
      <h2>All Queries</h2>
      {queries.length > 0 ? (
        queries.map((query) => (
          <div key={query._id} className="memo-box">
            <h3>{query.subject}</h3>
            <p>{query.description}</p>
            <p>Applicant Name: {query.name}</p>
            <p>Phone Number: {query.phoneNumber}</p>
            <p>Address: {query.address}</p>
            <button className="done-btn" onClick={() => handleDone(query._id)}>
              Mark as Done
            </button>
          </div>
        ))
      ) : (
        <p className="empty-message">No queries available.</p>
      )}
    </div>
  );
};

export default AllQueries;
