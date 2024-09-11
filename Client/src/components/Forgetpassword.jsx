import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState();
    const [favoritePet, setFavoritePet] = useState();
    const [newPassword, setNewPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post( 'http://localhost:3001/forgot-password', {email, favoritePet, newPassword})
        .then(result => {
            console.log(result);
            if(result.data === "Password updated"){
                alert('Password updated successfully!');
                navigate('/login');
            }
            else{
                alert('Incorrect favorite pet! Please try again.');
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <div>
            <div className="d-flex justify-content-center align-items-center text-center vh-100" style= {{backgroundImage : "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))"}}>
                <div className="bg-white p-3 rounded" style={{width : '40%'}}>
                    <h2 className='mb-3 text-primary'>Forgot Password</h2>
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
                        <button type="submit" className="btn btn-primary">Update Password</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;
