import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Profile from './Profile'; // Import the new Profile component
import ForgotPassword from "./Forgetpassword";

function App() {
    return (
        <div style={{ marginTop: '-3.5rem' }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Register />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/Forgetpassword" element={<ForgotPassword/>}/>
                    <Route path="/home" element={<Home />} />
                    <Route path="/profile" element={<Profile />} /> {/* Add Profile route */}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
