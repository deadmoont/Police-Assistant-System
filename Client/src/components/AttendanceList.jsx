import React, { useState } from "react";
import "../styles/App.css"; // Import CSS
import { updatePersonnel } from "../services/personnelService"; // Import the service function

const AttendanceList = ({
  personnel,
  addPersonnel,
  updatePersonnelStatus,
  deletePersonnel,
  editPersonnel,
}) => {
  const [filter, setFilter] = useState("All");
  const [newPersonnelName, setNewPersonnelName] = useState("");
  const [newPersonnelRole, setNewPersonnelRole] = useState("Patrol");
  const [editMode, setEditMode] = useState(null); // For editing personnel

  const toggleStatus = (id) => {
    const person = personnel.find((p) => p.id === id);
    const newStatus = person.status === "Present" ? "Absent" : "Present";
    updatePersonnelStatus(id, newStatus);
  };

  const handleAddPersonnel = () => {
    if (newPersonnelName.trim() !== "") {
      const newId = personnel.length
        ? personnel[personnel.length - 1].id + 1
        : 1;
      const newPerson = {
        id: newId,
        name: newPersonnelName,
        role: newPersonnelRole,
        status: "Absent",
      };
      addPersonnel(newPerson);
      resetFields();
    }
  };

  const handleEditPersonnel = (person) => {
    setNewPersonnelName(person.name);
    setNewPersonnelRole(person.role);
    setEditMode(person.id);
  };

  const handleUpdatePersonnel = async () => {
    if (editMode) {
      const updatedPerson = {
        id: editMode,
        name: newPersonnelName,
        role: newPersonnelRole,
        status: personnel.find((p) => p.id === editMode).status,
      };
      await editPersonnel(updatedPerson); // Call the edit function
      resetFields();
    }
  };
  

  const resetFields = () => {
    setNewPersonnelName("");
    setNewPersonnelRole("Patrol");
    setEditMode(null);
  };

  const filteredPersonnel = personnel.filter((person) => {
    const matchesStatus = filter === "All" || person.status === filter;
    return matchesStatus;
  });

  const sortedPersonnel = filteredPersonnel.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div className="container">
      <h2>Attendance List</h2>

      <div className="filter">
        <label>
          Filter by Status:
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </label>
      </div>

      <div className="input-group">
        <input
          type="text"
          placeholder="Add or Edit personnel"
          value={newPersonnelName}
          onChange={(e) => setNewPersonnelName(e.target.value)}
        />
        <select
          value={newPersonnelRole}
          onChange={(e) => setNewPersonnelRole(e.target.value)}
        >
          <option value="Patrol">Patrol</option>
          <option value="Investigation">Investigation</option>
          <option value="Cyber">Cyber</option>
        </select>
        <button onClick={editMode ? handleUpdatePersonnel : handleAddPersonnel}>
          {editMode ? "Update Personnel" : "Add Personnel"}
        </button>
      </div>

      <ul>
        {sortedPersonnel.map((person) => (
          <li key={person.id}>
            {person.name} - {person.status}
            <div>
              <button onClick={() => toggleStatus(person.id)}>
                Mark {person.status === "Present" ? "Absent" : "Present"}
              </button>
              <button onClick={() => handleEditPersonnel(person)}>Edit</button>
              <button onClick={() => deletePersonnel(person.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttendanceList;
