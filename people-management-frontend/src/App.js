import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/dashboard';
import LeaveTracker from './components/LeaveTracker';
import ApplyLeaveModal from './components/ApplyLeave';
import LeaveBalance from './components/LeaveBalance';
import LeaveRequests from './components/LeaveRequests';
import TeamReportees from './components/TeamReportees';
import TeamOnLeave from './components/TeamOnLeave';
import TeamLeaveRequests from './components/TeamLeaveRequests';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Main Dashboard Route */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/leave-tracker" element={<LeaveTracker />} />
          <Route path="/leave-tracker/summary" element={<LeaveTracker />} />
          <Route path="/leave-tracker/Apply-Leave" element={<ApplyLeaveModal />} />
          <Route path="/leave-tracker/balance" element={<LeaveBalance />} />
          <Route path="/leave-tracker/requests" element={<LeaveRequests />} />
          <Route path="/team" element={<TeamReportees />} />
          <Route path="/team/on-leave" element={<TeamOnLeave />} />
          <Route path="/team/leave-requests" element={<TeamLeaveRequests />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
