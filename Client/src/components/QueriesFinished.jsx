import  { useState, useEffect } from "react";
import "./CSS/QueriesFinished.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const QueriesFinished = () => {
  const [doneQueries, setDoneQueries] = useState([]);
  const [searchPhone, setSearchPhone] = useState("");
  const [filteredQueries, setFilteredQueries] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/done")
      .then((response) => response.json())
      .then((data) => {
        setDoneQueries(data);
        setFilteredQueries(data);
      })
      .catch((error) => console.error("Error fetching done queries:", error));
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchPhone(value);

    if (value.trim() !== "") {
      const filtered = doneQueries.filter((query) =>
        query.phoneNumber.includes(value)
      );
      setFilteredQueries(filtered);
    } else {
      setFilteredQueries(doneQueries);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="memos-container">
        <h2>Finished Queries</h2>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search by phone number"
            value={searchPhone}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        {filteredQueries.length > 0 ? (
          <div className="memo-grid">
            {filteredQueries.map((query, index) => (
              <div key={query._id} className="memo-box">
                <h3 className="queue1"> {index + 1}</h3>
                <h3 className="heading1">Subject: {query.subject}</h3>
                <p><strong>Description:</strong> {query.description}</p>
                <p><strong>Applicant Name:</strong> {query.name}</p>
                <p><strong>Phone Number:</strong> {query.phoneNumber}</p>
                <p><strong>Address:</strong> {query.address}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-message">No finished queries available.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default QueriesFinished;
