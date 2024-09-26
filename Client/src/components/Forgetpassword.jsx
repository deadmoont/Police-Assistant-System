import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CSS/ForgotPassword.css';  // Assuming you'll move the CSS to a separate file

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [favoritePet, setFavoritePet] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post('http://localhost:3001/forgot-password', {email, favoritePet, newPassword})
        .then(result => {
            if(result.data === "Password updated") {
                alert('Password updated successfully!');
                navigate('/login');
            } else {
                alert('Incorrect favorite pet! Please try again.');
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="forgot-password-container">
            <div className="form-box">
                <h2 className="text-primary text-center"><strong>Forgot Password</strong></h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 text-start">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            <strong>Email Id</strong>
                        </label>
                        <input 
                            type="email"
                            placeholder="Enter Email"
                            className="form-control"
                            id="exampleInputEmail1"
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3 text-start">
                        <label htmlFor="favoritePet" className="form-label">
                            <strong>Your Favorite Pet</strong>
                        </label>
                        <input 
                            type="text"
                            placeholder="Enter Your Favorite Pet"
                            className="form-control"
                            id="favoritePet"
                            onChange={(event) => setFavoritePet(event.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3 text-start">
                        <label htmlFor="newPassword" className="form-label">
                            <strong>New Password</strong>
                        </label>
                        <input 
                            type="password"
                            placeholder="Enter New Password"
                            className="form-control"
                            id="newPassword"
                            onChange={(event) => setNewPassword(event.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Update Password</button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword;
