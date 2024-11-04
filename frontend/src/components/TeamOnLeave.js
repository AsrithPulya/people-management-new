import React from 'react';
import Sidebar from './Sidebar';
import '../TeamOnLeave.css';
import { Link } from 'react-router-dom';

const TeamOnLeave = () => {
  return (
    <div className="team-on-leave-page">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navigation Bar */}
        <div className="top-nav">
          <div className="nav-links">
            <Link to="/mydata" className="nav-link">My Data</Link>
            <Link to="/team" className="nav-link active">Team</Link>
          </div>
        </div>

        {/* Sub Navigation Bar for Team */}
        <div className="sub-nav">
          <Link to="/team/reportees" className="sub-nav-link">Reportees</Link>
          <Link to="/team/on-leave" className="sub-nav-link active">On Leave</Link>
          <Link to="/team/leave-requests" className="sub-nav-link">Leave Requests</Link>
        </div>

        {/* On Leave Content */}
        <div className="on-leave-content">
          <div className="no-leave-message">
            <p>No team members on leave this week</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamOnLeave;
