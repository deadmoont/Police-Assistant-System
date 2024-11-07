import React from "react";
import '../styles/App.css'; // Import CSS

const PersonnelList = ({ personnel }) => {
  return (
    <div className="container">
      <h2>Personnel List</h2>
      <ul>
        {personnel.map((person) => (
          <li key={person.id}>
            {person.name} - {person.role} - {person.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonnelList;
