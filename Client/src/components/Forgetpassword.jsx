import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './CSS/ForgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    // Send OTP to the user's email
    const handleSendOtp = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3001/send-otp', { email })
            .then(() => {
                alert('OTP sent to your email!');
                setOtpSent(true); // Switches to OTP input screen
            })
            .catch(err => {
                console.error(err);
                alert('Failed to send OTP. Please try again.'); // Alert for error in sending OTP
            });
    };

    // Verify OTP and allow password change
    const handleVerifyOtp = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3001/verify-otp', { email, otp })
            .then(response => {
                if (response.data.message === 'OTP verified successfully') {
                    alert('OTP verified successfully! Please set a new password.');
                    setIsVerified(true); // After success, allow password change
                } else {
                    alert('Invalid OTP. Please try again.');
                }
            })
            .catch(err => {
                console.error(err);
                alert('Error verifying OTP. Please try again.'); // Alert for error in OTP verification
            });
    };

    // Handle password change
    const handleChangePassword = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3001/change-password', { email, newPassword })
            .then(response => {
                alert('Password reset successful!');
                navigate('/login'); // Redirect to the login page or wherever appropriate
            })
            .catch(err => {
                console.error(err);
                alert('Failed to reset password. Please try again.'); // Alert for error in changing password
            });
    };

    return (
        <div className="forgot-password-container">
            <h2>Forgot Password</h2>
            {!otpSent ? (
                <form onSubmit={handleSendOtp}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Send OTP</button>
                </form>
            ) : !isVerified ? (
                <form onSubmit={handleVerifyOtp}>
                    <div className="mb-3">
                        <label htmlFor="otp" className="form-label">Enter OTP</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="otp" 
                            placeholder="Enter 6-digit OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Verify OTP</button>
                </form>
            ) : (
                <form onSubmit={handleChangePassword}>
                    <div className="mb-3">
                        <label htmlFor="newPassword" className="form-label">New Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="newPassword" 
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Change Password</button>
                </form>
            )}
        </div>
    );
};

export default ForgotPassword;
