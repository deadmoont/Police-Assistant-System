// import React, { useState, useEffect } from "react";
// import "./CSS/MemoApp.css"; // Import your styles
// import Navbar from "./Navbar.jsx";
// import Footer from "./Footer.jsx";
// const MemoApp = () => {
//   const [applications, setApplications] = useState([]);
//   const [formData, setFormData] = useState({
//     subject: "",
//     description: "",
//     name: "",
//     phoneNumber: "",
//     address: "",
//   });

//   // Updates the applications every second
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setApplications([...applications]); // Trigger a re-render to update the duration every second
//     }, 1000);

//     return () => clearInterval(interval); // Cleanup the interval on component unmount
//   }, [applications]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const addApplication = () => {
//     const { subject, description, name, phoneNumber, address } = formData;
//     if (
//       subject.trim() &&
//       description.trim() &&
//       name.trim() &&
//       phoneNumber.trim() &&
//       address.trim()
//     ) {
//       const newApplication = {
//         id: Date.now(),
//         subject,
//         description,
//         name,
//         phoneNumber,
//         address,
//         timestamp: new Date(),
//       };
//       setApplications([...applications, newApplication]);
//       setFormData({
//         subject: "",
//         description: "",
//         name: "",
//         phoneNumber: "",
//         address: "",
//       });
//     }
//   };

//   const deleteApplication = (id) => {
//     setApplications(applications.filter((app) => app.id !== id));
//   };

//   const getDuration = (timestamp) => {
//     const now = new Date();
//     const duration = Math.floor((now - new Date(timestamp)) / 1000); // in seconds
//     const hours = Math.floor(duration / 3600);
//     const minutes = Math.floor((duration % 3600) / 60);
//     const seconds = duration % 60;
//     return `${hours} hr ${minutes} min ${seconds} sec`;
//   };

//   return (
//     <>
//     <Navbar></Navbar>
//     <div className="memo-app">
//       <h1 className="app-title">Application Form</h1>
//       <div className="input-container">
//         <input
//           type="text"
//           name="subject"
//           value={formData.subject}
//           onChange={handleChange}
//           placeholder="Enter subject"
//           className="memo-input"
//         />
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           placeholder="Enter description"
//           className="memo-input"
//         ></textarea>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           placeholder="Enter applicant name"
//           className="memo-input"
//         />
//         <input
//           type="tel"
//           name="phoneNumber"
//           value={formData.phoneNumber}
//           onChange={handleChange}
//           placeholder="Enter phone number"
//           className="memo-input"
//         />
//         <input
//           type="text"
//           name="address"
//           value={formData.address}
//           onChange={handleChange}
//           placeholder="Enter address"
//           className="memo-input"
//         />
//         <button onClick={addApplication} className="add-btn">
//           Submit Application
//         </button>
//       </div>

//       <div className="memos-container">
//         {applications.length === 0 ? (
//           <p className="empty-message">No applications submitted</p>
//         ) : (
//           <div className="memos-grid">
//             {applications.map((app) => (
//               <div className="memo-box" key={app.id}>
//                 <p>
//                   <strong>Subject:</strong> {app.subject}
//                 </p>
//                 <p>
//                   <strong>Description:</strong> {app.description}
//                 </p>
//                 <p>
//                   <strong>Applicant:</strong> {app.name}
//                 </p>
//                 <p>
//                   <strong>Phone:</strong> {app.phoneNumber}
//                 </p>
//                 <p>
//                   <strong>Address:</strong> {app.address}
//                 </p>
//                 <p className="memo-time">
//                   Submitted {getDuration(app.timestamp)} ago
//                 </p>
//                 <button
//                   className="delete-btn"
//                   onClick={() => deleteApplication(app.id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

     
//     </div>
//     <Footer></Footer>
//     </>
//   );
// };

// export default MemoApp;


import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./CSS/MemoApp.css";

const MemoApp = () => {
  const [applications, setApplications] = useState([]);
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    name: "",
    phoneNumber: "",
    address: "",
  });

  // Updates the applications every second
  useEffect(() => {
    const interval = setInterval(() => {
      setApplications([...applications]); // Trigger a re-render to update the duration every second
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [applications]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addApplication = () => {
    const { subject, description, name, phoneNumber, address } = formData;
    if (
      subject.trim() &&
      description.trim() &&
      name.trim() &&
      phoneNumber.trim() &&
      address.trim()
    ) {
      const newApplication = {
        id: Date.now(),
        subject,
        description,
        name,
        phoneNumber,
        address,
        timestamp: new Date(),
      };
      setApplications([...applications, newApplication]);
      setFormData({
        subject: "",
        description: "",
        name: "",
        phoneNumber: "",
        address: "",
      });
    }
  };

  const deleteApplication = (id) => {
    setApplications(applications.filter((app) => app.id !== id));
  };

  const getDuration = (timestamp) => {
    const now = new Date();
    const duration = Math.floor((now - new Date(timestamp)) / 1000); // in seconds
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;
    return `${hours} hr ${minutes} min ${seconds} sec`;
  };

  return (
    <>
      <Navbar />
      <div className="memo-app">
        <h2 className="app-title">Application Form</h2>
        <div className="input-container">
          <div className="form-group">
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter subject"
              className="memo-input"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="memo-input"
            ></textarea>
          </div>

          <div className="form-group">
            <label>Applicant Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter applicant name"
              className="memo-input"
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="memo-input"
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              className="memo-input"
            />
          </div>

          <button onClick={addApplication} className="save-button">
            Submit Application
          </button>
        </div>

        <div className="memos-container">
          {applications.length === 0 ? (
            <p className="empty-message">No applications submitted</p>
          ) : (
            <div className="memos-grid">
              {applications.map((app) => (
                <div className="memo-box" key={app.id}>
                  <p>
                    <strong>Subject:</strong> {app.subject}
                  </p>
                  <p>
                    <strong>Description:</strong> {app.description}
                  </p>
                  <p>
                    <strong>Applicant:</strong> {app.name}
                  </p>
                  <p>
                    <strong>Phone:</strong> {app.phoneNumber}
                  </p>
                  <p>
                    <strong>Address:</strong> {app.address}
                  </p>
                  <p className="memo-time">
                    Submitted {getDuration(app.timestamp)} ago
                  </p>
                  <button
                    className="delete-btn"
                    onClick={() => deleteApplication(app.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MemoApp;




