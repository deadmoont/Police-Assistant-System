import React, { useState, useEffect } from "react";

const QueriesFinished = () => {
  const [doneQueries, setDoneQueries] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/done")
      .then((response) => response.json())
      .then((data) => setDoneQueries(data))
      .catch((error) => console.error("Error fetching done queries:", error));
  }, []);

  return (
    <div className="memos-container">
      <h2>Finished Queries</h2>
      {doneQueries.length > 0 ? (
        doneQueries.map((query) => (
          <div key={query._id} className="memo-box">
            <h3>{query.subject}</h3>
            <p>{query.description}</p>
            <p>Applicant Name: {query.name}</p>
            <p>Phone Number: {query.phoneNumber}</p>
            <p>Address: {query.address}</p>
          </div>
        ))
      ) : (
        <p className="empty-message">No finished queries available.</p>
      )}
    </div>
  );
};

export default QueriesFinished;
