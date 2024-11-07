import React, { useState, useEffect } from "react";
import AttendanceList from "./AttendanceList";
import PersonnelList from "./PersonnelList";
import { getPersonnel } from "../services/personnelService";
import "./CSS/DepartmentTracker.css";
const DepartmentTracker = () => {
  const [personnel, setPersonnel] = useState([]);

  // Fetch initial personnel data from the service
  useEffect(() => {
    const fetchPersonnel = async () => {
      const data = await getPersonnel();
      setPersonnel(data);
    };
    fetchPersonnel();
  }, []);

  const addPersonnel = async (newPerson) => {
    // Check for duplicates
    const exists = personnel.some((person) => person.name === newPerson.name);
    if (!exists) {
      setPersonnel((prev) => [...prev, newPerson]);
      // Here you can also call addPersonnelService(newPerson) if needed
    }
  };

  const updatePersonnelStatus = async (id, newStatus) => {
    setPersonnel((prev) =>
      prev.map((person) =>
        person.id === id ? { ...person, status: newStatus } : person
      )
    );
    // Call your service to update status as well
  };

  const editPersonnel = async (updatedPerson) => {
    setPersonnel((prev) =>
      prev.map((person) =>
        person.id === updatedPerson.id ? updatedPerson : person
      )
    );
    // Here you can also call updatePersonnel(updatedPerson) if needed
  };

  return (
    <div>
      <AttendanceList
        personnel={personnel}
        addPersonnel={addPersonnel}
        updatePersonnelStatus={updatePersonnelStatus}
        editPersonnel={editPersonnel} // Pass down edit function
      />
      <PersonnelList personnel={personnel} />
    </div>
  );
};

export default DepartmentTracker;
