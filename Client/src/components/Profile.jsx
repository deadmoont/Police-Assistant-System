import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profile.css';

const Profile = () => {
    const [userData, setUserData] = useState({ name: '', email: '' });
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    // Extract email from the URL
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const email = urlParams.get('email');  // Extracting the email from the query param

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

    const handlePasswordChange = (event) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage('New passwords do not match.');
            return;
        }

        axios.post('http://localhost:3001/change-password', { 
            email: userData.email, 
            currentPassword, 
            newPassword 
        })
            .then(response => {
                setMessage('Password changed successfully!');
            })
            .catch(err => {
                setMessage('Error changing password.');
                console.log(err);
            });
    };

    return (
        <div className="profile-container d-flex justify-content-center align-items-center vh-100">
            <div className="profile-card bg-white p-4 rounded shadow">
                <h2 className="mb-4 text-primary">Profile</h2>
                <div className="user-info mb-4">
                    <p><strong>Name:</strong> {userData.name}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                </div>

                <h4 className="mb-3 text-secondary">Change Password</h4>
                <form onSubmit={handlePasswordChange}>
                    <div className="mb-3">
                        <label htmlFor="currentPassword" className="form-label"><strong>Current Password</strong></label>
                        <input
                            type="password"
                            placeholder="Enter Current Password"
                            className="form-control"
                            id="currentPassword"
                            onChange={(event) => setCurrentPassword(event.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="newPassword" className="form-label"><strong>New Password</strong></label>
                        <input
                            type="password"
                            placeholder="Enter New Password"
                            className="form-control"
                            id="newPassword"
                            onChange={(event) => setNewPassword(event.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="form-label"><strong>Confirm New Password</strong></label>
                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            className="form-control"
                            id="confirmPassword"
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Change Password</button>
                </form>
                {message && <p className="mt-3 text-center">{message}</p>}
            </div>
        </div>
    );
};

export default Profile;
