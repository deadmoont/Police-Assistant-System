import React from "react";
import "./CSS/Personallist.css"
const PersonnelList = ({ personnel }) => {
  return (
    <div className="container2">
      <h2>Personnel List</h2>
      <ul>
        {personnel.map((person) => (
          <li key={person.id} id={`person-${person.id}`} className="lid2">
            {person.name} - {person.role} - {person.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonnelList;
