import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/dashboard'
import Login from './components/Login'; 
import LeaveTracker from './components/LeaveTracker';
import ApplyLeaveModal from './components/ApplyLeave';
import LeaveBalance from './components/LeaveBalance';
import LeaveRequests from './components/LeaveRequests';
import TeamReportees from './components/TeamReportees';
import TeamOnLeave from './components/TeamOnLeave';
import TeamLeaveRequests from './components/TeamLeaveRequests';
import Myspace from './components/Myspace';
import Organization from './components/Organization';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Login Route */}
          <Route path="/" element={<Login />} />
          
          {/* Main Dashboard Route */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Myspace" element={<Myspace />} />
          <Route path="/Organization" element={<Organization />} />
          <Route path="/leave-tracker" element={<LeaveTracker />} />
          <Route path="/leave-tracker/summary" element={<LeaveTracker />} />
          <Route path="/leave-tracker/apply-leave" element={<ApplyLeaveModal />} />
          <Route path="/leave-tracker/balance" element={<LeaveBalance />} />
          <Route path="/leave-tracker/requests" element={<LeaveRequests />} />
          <Route path="/team" element={<TeamReportees />} />
          <Route path="/team/reportees" element={<TeamReportees />} />
          <Route path="/team/on-leave" element={<TeamOnLeave />} />
          <Route path="/team/leave-requests" element={<TeamLeaveRequests />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
