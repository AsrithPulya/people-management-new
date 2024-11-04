import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ApplyLeaveModal from './ApplyLeave'; 
import '../LeaveTracker.css';
import { Link } from 'react-router-dom';

function LeaveTracker() {
  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Functions to open and close the modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="leave-tracker-page">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navigation Bar */}
        <div className="top-nav">
          <div className="nav-links">
            <Link to="/mydata" className="nav-link active">MyData</Link>
            <Link to="/team" className="nav-link">Team</Link>
          </div>
        </div>

        {/* Leave Tracker Content */}
        <div className="leave-tracker">
          {/* Sub Navigation Bar for Leave Tracker */}
          <div className="sub-nav">
            <Link to="/leave-tracker/summary" className="sub-nav-link active">Leave Summary</Link>
            <Link to="/leave-tracker/balance" className="sub-nav-link">Leave Balance</Link>
            <Link to="/leave-tracker/requests" className="sub-nav-link">Leave Requests</Link>
          </div>
          
          <div className="date-apply-container">
            <div className="date-selector">
              <input type="date" defaultValue="2024-01-01" /> - <input type="date" defaultValue="2024-12-31" />
            </div>
            <button className="apply-leave-btn" onClick={openModal}>Apply Leave</button> 
          </div>

          {/* Leave Summary Cards */}
          <div className="leave-summary-cards">
            <div className="card">
              <p className="card-title">Leave Without Pay</p>
              <p className="card-data">Booked <span>0</span></p>
            </div>
            <div className="card">
              <p className="card-title">Personal Leave</p>
              <p className="card-data">Available <span>2.5</span></p>
              <p className="card-data">Booked <span>9.5</span></p>
            </div>
            <div className="card">
              <p className="card-title">Sick Leave</p>
              <p className="card-data">Available <span>2</span></p>
              <p className="card-data">Booked <span>1</span></p>
            </div>
            <div className="card">
              <p className="card-title">Work From Home</p>
              <p className="card-data">Available <span>11</span></p>
              <p className="card-data">Booked <span>10</span></p>
            </div>
          </div>

          {/* Upcoming Leave & Holidays Table */}
          <div className="upcoming-leave-table">
            <div className="table-header">
              <p>Upcoming Leave & Holidays</p>
              <select>
                <option>Upcoming Leave & Holidays</option>
              </select>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Apply Leave Modal */}
      <ApplyLeaveModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default LeaveTracker;
