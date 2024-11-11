import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import '../LeaveTracker.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function LeaveRequests() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const token = localStorage.getItem('accessToken'); // Retrieve token from localStorage

  // Fetch leave requests data from the API
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/leave-requests/', {
      headers: {
        'Authorization': `Bearer ${token}`, 
      }
    })
    .then(response => {
      setLeaveRequests(response.data);
    })
    .catch(error => {
      console.error('There was an error fetching the leave requests!', error);
    });
  }, [token]);

  return (
    <div className="leave-tracker-page">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navigation Bar */}
        <div className="top-nav">
          <div className="nav-links">
            <Link to="/leave-tracker" className="nav-link active">My Data</Link>
            <Link to="/team" className="nav-link">Team</Link>
          </div>
        </div>

        {/* Sub Navigation Bar for Leave Tracker */}
        <div className="sub-nav">
          <Link to="/leave-tracker/summary" className="sub-nav-link">Leave Summary</Link>
          <Link to="/leave-tracker/balance" className="sub-nav-link">Leave Balance</Link>
          <Link to="/leave-tracker/requests" className="sub-nav-link active">Leave Requests</Link>
        </div>

        {/* Leave Requests Content */}
        <h2>Leave Requests</h2>
        <button className="apply-leave-btn">Add Leave Request</button>

        <table className="leave-requests-table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Employee ID</th>
              <th>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.employee ? request.employee.Name : 'N/A'}</td> {/* Render the employee name */}
                <td>{request.employee ? request.employee.emp_code : 'N/A'}</td> {/* Render emp_code */}
                <td>{request.leave_type_name}</td>
                <td>{request.start_date}</td>
                <td>{request.end_date}</td>
                <td>
                  <span className={`status-icon ${request.status_of_leave.toLowerCase()}`}></span>
                  {request.status_of_leave}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer Information */}
        <div className="footer-info">
          <p>Total Leave Requests: <strong>{leaveRequests.length}</strong></p>
          <p>Last updated: <strong>{new Date().toLocaleDateString()}</strong></p>
        </div>
      </div>
    </div>
  );
}

export default LeaveRequests;
