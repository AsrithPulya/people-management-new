import React from 'react';
import Sidebar from './Sidebar'; // Import Sidebar component
import '../LeaveTracker.css'; // Ensure styles are applied
import { Link } from 'react-router-dom';

function LeaveRequests() {
  return (
    <div className="leave-tracker-page">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navigation Bar */}
        <div className="top-nav">
          <div className="nav-links">
            <Link to="/mydata" className="nav-link">MyData</Link>
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
        <button className="add-request-btn">Add Leave Request</button>
        
        <table className="leave-requests-table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Employee ID</th>
              <th>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>12345</td>
              <td>Sick Leave</td>
              <td>2024-01-01</td>
              <td>2024-01-03</td>
              <td>
                <span className="status-icon approved"></span> Approved
              </td>
              <td>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Jane Smith</td>
              <td>67890</td>
              <td>Personal Leave</td>
              <td>2024-01-10</td>
              <td>2024-01-15</td>
              <td>
                <span className="status-icon pending"></span> Pending
              </td>
              <td>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Footer Information */}
        <div className="footer-info">
          <p>Total Leave Requests: <strong>2</strong></p>
          <p>Last updated: <strong>2024-01-30</strong></p>
        </div>
      </div>
    </div>
  );
}

export default LeaveRequests;
