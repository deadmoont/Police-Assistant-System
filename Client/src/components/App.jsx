import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import ForgotPassword from "./Forgetpassword";
import FileRecord from "./FileRecord";
import UserRegister from "./UserRegister";
import "../styles/App.css"; // Import the styles

function AppContent() {
  return (
    <div /*style={{ marginTop: "+4.5rem"}}*/>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Forgotpassword" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/UserRegister" element={<UserRegister />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/FileRecord" element={<FileRecord />} />{" "}
        {/* No need to pass category here */}
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
