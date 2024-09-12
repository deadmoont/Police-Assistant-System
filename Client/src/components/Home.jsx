import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/homepage.css';
import { Link, useNavigate } from "react-router-dom";  // Make sure you import the necessary hooks

const Home = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({ name: '', email: '' });

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const email = urlParams.get('email');  // Extract the email from the query param

        axios.get('http://localhost:3001/profile', {
            withCredentials: true,
            params: { email }
        })
        .then(response => {
            setUserData({
                name: response.data.name,
                email: response.data.email,
            });
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    // Use a function for navigation when clicking the profile icon
    const handleProfileClick = () => {
        navigate(`/Profile?email=${userData.email}`);
    };

    return (
        <div>
            {/* Header */}
            <header>
                <div className="logo">
                    <img src="../Images/logo.jpg" alt="PDAS Logo" />
                </div>
                <div className="emblem">
                    <img src="../Images/Emblem.png" alt="Emblem" />
                </div>
                <div className="edit-profile">
                    {/* Use a button or div for navigation */}
                    <img 
                        src="profile.png" 
                        alt="Edit Profile" 
                        onClick={handleProfileClick}  // Call the function to navigate to the profile
                        style={{ cursor: 'pointer' }}  // Make the icon clickable
                    />
                </div>
            </header>

            {/* Main Section */}
            <main>
                <div className="section">
                    <a href="CameraMonitoring.html"><h2>Camera Monitoring</h2></a>
                    <img src="../Images/camera.jpg" alt="Camera Monitoring" />
                </div>
                <div className="section">
                    <a href="Queueing.html"><h2>Queueing</h2></a>
                    <img src="../Images/Queue.jpg" alt="Queueing" />
                </div>
                <div className="section">
                    <a href="Database.html"><h2>Database</h2></a>
                    <img src="../Images/database.png" alt="Database" />
                </div>
                <div className="section">
                    <a href="DepartmentTracker.html"><h2>Department Tracker</h2></a>
                    <img src="../Images/Tracker.jpg" alt="Department Tracker" />
                </div>
            </main>

            {/* Footer */}
            <footer>
                <p>&copy; 2024 Police Department Assistance System. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
