import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../LeaveTracker.css';

function LeaveBalance() {
  const [leaveBalances, setLeaveBalances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaveBalances = async () => {
      try {
        const token = localStorage.getItem('accessToken'); // Retrieve token from localStorage

        if (!token) {
          alert('You are not authorized. Please log in again.');
          return;
        }

        const response = await axios.get('http://127.0.0.1:8000/api/employee/leave-balance/', {
          headers: { Authorization: `Bearer ${token}` }, 
        });
        setLeaveBalances(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching leave balances:', error);
        setLoading(false);
      }
    };

    fetchLeaveBalances();
  }, []);

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

          {/* Loading Indicator */}
          {loading ? (
            <p>Loading leave balances...</p>
          ) : (
            <div className="leave-balance-cards">
              {leaveBalances.map((leave, index) => (
                <div className="card" key={index}>
                  <p className="card-title">{leave.leave_type}</p>
                  <p className="card-data">Available: <span>{leave.remaining_balance}</span> days</p>
                  <p className="card-data">Booked: <span>{leave.total_taken}</span> days</p>
                  <p className="card-data">Total Allocated: <span>{leave.total_allocated}</span> days</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LeaveBalance;
