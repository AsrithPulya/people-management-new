import React from 'react';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import '../LeaveTracker.css';

function LeaveBalance() {
  return (
    <div className="leave-tracker-page">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navigation Bar */}
        <div className="top-nav">
          <div className="nav-links">
            <Link to="/leave-tracker" className="nav-link active">MyData</Link>
            <Link to="/team" className="nav-link">Team</Link>
          </div>
        </div>

        {/* Leave Balance Content */}
        <div className="leave-tracker">
          {/* Sub Navigation Bar for Leave Tracker */}
          <div className="sub-nav">
            <Link to="/leave-tracker/summary" className="sub-nav-link">Leave Summary</Link>
            <Link to="/leave-tracker/balance" className="sub-nav-link active">Leave Balance</Link>
            <Link to="/leave-tracker/requests" className="sub-nav-link">Leave Requests</Link>
          </div>

          {/* Leave Balance Cards */}
          <div className="leave-balance-cards">
            <div className="card">
              <p className="card-title">Leave Without Pay</p>
              <p className="card-data">Available: <span>0</span> days</p>
              <p className="card-data">Booked: <span>0</span> days</p>
            </div>
            <div className="card">
              <p className="card-title">Personal Leave</p>
              <p className="card-data">Available: <span>2.5</span> days</p>
              <p className="card-data">Booked: <span>9.5</span> days</p>
            </div>
            <div className="card">
              <p className="card-title">Sick Leave</p>
              <p className="card-data">Available: <span>2</span> days</p>
              <p className="card-data">Booked: <span>1</span> day</p>
            </div>
            <div className="card">
              <p className="card-title">Work From Home</p>
              <p className="card-data">Available: <span>11</span> days</p>
              <p className="card-data">Booked: <span>10</span> days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaveBalance;