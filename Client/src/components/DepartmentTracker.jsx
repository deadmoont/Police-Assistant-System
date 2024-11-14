import React, { useState, useEffect } from "react";
import "./CSS/DepartmentTracker.css";
import Navbar from "./Navbar";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Footer from "./Footer";

const DepartmentTracker = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/api/employees")
      .then(response => setEmployees(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleRowClick = (employee) => {
    setSelectedEmployee(employee);
    setDescription(employee.desc || "");
  };

  const toggleWorkingStatus = () => {
    const updatedStatus = selectedEmployee.working === "free" ? "busy" : "free";

    if (updatedStatus === "busy" && !description.trim()) {
      alert("Please enter a description before marking the employee as busy.");
      return;
    }

    axios.put(`http://localhost:3001/api/employees/${selectedEmployee._id}`, { 
      working: updatedStatus,
      desc: updatedStatus === "busy" ? description : ""
    })
    .then(response => {
      setEmployees(prev => prev.map(emp =>
        emp._id === response.data._id ? response.data : emp
      ));
      setSelectedEmployee(response.data);
      if (updatedStatus === "free") setDescription("");
    })
    .catch(error => console.error(error));
  };

  const toggleAttendance = (emp) => {
    const updatedStatus = emp.status === "present" ? "absent" : "present";
    axios.put(`http://localhost:3001/api/employees/${emp._id}`, { status: updatedStatus })
      .then(response => {
        setEmployees(prev => prev.map(e =>
          e._id === response.data._id ? response.data : e
        ));
      })
      .catch(error => console.error(error));
  };

  const exportAttendance = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Attendance Report", 10, 10);
    doc.setFontSize(12);

    // Create table headers
    const headers = ['Name', 'Attendance Status'];
    const rows = employees.map(emp => [
      emp.name,
      emp.status === "present" ? "Present" : "Absent"
    ]);

    // Draw table
    doc.autoTable({
      head: [headers],
      body: rows,
      startY: 20, // Start table after title
      theme: 'striped', // Table theme (you can change it)
      margin: { top: 10 }
    });

    // Save the PDF
    doc.save(`Attendance_Report_${new Date().toLocaleDateString()}.pdf`);
  };

  const freeEmployees = employees.filter(emp => emp.working === "free");
  const busyEmployees = employees.filter(emp => emp.working === "busy");

  return (
    <div>
      <Navbar />
      <div className="department-tracker">
        <div className="employee-list free">
          <h2>Free Employees</h2>
          <table>
            <thead>
              <tr><th>Status</th><th>Name</th><th>Position</th></tr>
            </thead>
            <tbody>
              {freeEmployees.map(emp => (
                <tr key={emp._id} onClick={() => handleRowClick(emp)}>
                  <td>{emp.status === "present" ? "✔️" : "❌"}</td>
                  <td>{emp.name}</td>
                  <td>{emp.position}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="employee-list busy">
          <h2>Busy Employees</h2>
          <table>
            <thead>
              <tr><th>Name</th><th>Position</th></tr>
            </thead>
            <tbody>
              {busyEmployees.map(emp => (
                <tr key={emp._id} onClick={() => handleRowClick(emp)}>
                  <td>{emp.name}</td>
                  <td>{emp.position}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedEmployee && (
        <div className="employee-profile">
          <h3>Profile: {selectedEmployee.name}</h3>
          <p><strong>Age:</strong> {selectedEmployee.age}</p>
          <p><strong>Position:</strong> {selectedEmployee.position}</p>
          <p><strong>Phone No:</strong> {selectedEmployee.phoneNo}</p>
          <p><strong>Address:</strong> {selectedEmployee.address}</p>
          <p><strong>Working Status:</strong> {selectedEmployee.working}</p>

          {selectedEmployee.working === "busy" && (
            <p><strong>Description:</strong> {selectedEmployee.desc}</p>
          )}

          {selectedEmployee.working === "free" && (
            <div className="description-input">
              <label>
                <strong>Description:</strong>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description to mark as busy"
                />
              </label>
            </div>
          )}

          <button onClick={toggleWorkingStatus}>
            Mark as {selectedEmployee.working === "free" ? "Busy" : "Free"}
          </button>
        </div>
      )}

      {/* Export Attendance button on the right side */}
      <div className="export-attendance">
        <button onClick={exportAttendance} className="export-button">
          Export Attendance as PDF
        </button>
      </div>

      
    </div>
  );
};

export default DepartmentTracker;
