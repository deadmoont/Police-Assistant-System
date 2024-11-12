import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import ForgotPassword from "./Forgetpassword";
import FileRecord from "./FileRecord";
import UserRegister from "./UserRegister";
import MemoApp from "./MemoApp";
import AllQueries from "./AllQueries";
import QueriesFinished from "./QueriesFinished";
import Queueopener from "./Queueopener";
import AttendanceList from "./AttendanceList";
import DepartmentTracker from "./DepartmentTracker";
import PersonnelList from "./PersonnelList";
import CamMonitor from "./CamMonitor"; // Import CamMonitor

function AppContent() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Forgotpassword" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/UserRegister" element={<UserRegister />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/FileRecord" element={<FileRecord />} />
        <Route path="/MemoApp" element={<MemoApp />} />
        <Route path="/all-queries" element={<AllQueries />} />
        <Route path="/queries-finished" element={<QueriesFinished />} />
        <Route path="/Queueopener" element={<Queueopener />} />
        <Route path="/PersonnelList" element={<PersonnelList />} />
        <Route path="/AttendanceList" element={<AttendanceList />} />
        <Route path="/DepartmentTracker" element={<DepartmentTracker />} />
        <Route path="/cam-monitor" element={<CamMonitor />} /> {/* Add CamMonitor route */}
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
