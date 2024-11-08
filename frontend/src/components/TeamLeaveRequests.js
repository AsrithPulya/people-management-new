import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import '../TeamReportees.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TeamReportees = () => {
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState('grid');
  const [reportees, setReportees] = useState([]); 
  const [loading, setLoading] = useState(true); 

  // Fetch leave requests dynamically 
  useEffect(() => {
    const fetchReportees = async () => {
      try {
        const token = localStorage.getItem('accessToken'); // Retrieve token from localStorage

        if (!token) {
          alert('You are not authorized. Please log in again.');
          return;
        }

        const response = await axios.get('http://127.0.0.1:8000/api/reportees/leave-requests/', {
          headers: { Authorization: `Bearer ${token}` }, 
        });

        setReportees(response.data); 
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching leave requests:', error);
        setLoading(false); 
      }
    };

    fetchReportees();
  }, []); 

  const filteredReportees = reportees.filter(reportee => {
    return filter === 'all' || 
           (filter === 'direct' && reportee.checkInStatus === 'Yet to check-in');
  });

  // Approve or Reject leave request
  const handleApproveReject = async (leaveId, action) => {
    const token = localStorage.getItem('accessToken'); // Retrieve token from localStorage

    if (!token) {
      alert('You are not authorized. Please log in again.');
      return;
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/leave-requests/${leaveId}/approve-reject/`,
        { action }, // action can be 'approve' or 'reject'
        {
          headers: { Authorization: `Bearer ${token}` }, 
        }
      );
      alert(`Leave request ${action}d successfully!`);
      setReportees(reportees.filter(reportee => reportee.id !== leaveId)); // Remove approved/rejected request
    } catch (error) {
      console.error(`Error ${action}ing leave request:`, error);
      alert(`Failed to ${action} the leave request.`);
    }
  };

  return (
    <div className="team-reportees-page">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navigation Bar */}
        <div className="top-nav">
          <div className="nav-links">
            <Link to="/leave-tracker" className="nav-link">My Data</Link>
            <Link to="/team" className="nav-link active">Team</Link>
          </div>
        </div>

        {/* Sub Navigation Bar for Team */}
        <div className="sub-nav">
          <Link to="/team/reportees" className="sub-nav-link">Reportees</Link>
          <Link to="/team/on-leave" className="sub-nav-link">On Leave</Link>
          <Link to="/team/leave-requests" className="sub-nav-link active">Leave Requests</Link>
        </div>

        {/* Reportees Header */}
        <div className="header">
          <h2>Reportees</h2>
          <div className="filters">
            <button
              className={`filter-btn ${filter === 'direct' ? 'active' : ''}`}
              onClick={() => setFilter('direct')}
            >
              Yet to Report {filteredReportees.length}
            </button>
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All {reportees.length}
            </button>
            <div className="view-toggle">
              <button 
                onClick={() => setView('grid')} 
                className={`toggle-btn ${view === 'grid' ? 'active' : ''}`}
              >
                Grid
              </button>
              <button 
                onClick={() => setView('list')} 
                className={`toggle-btn ${view === 'list' ? 'active' : ''}`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Reportees Container */}
        <div className={`reportees-container ${view}`}>
          {loading ? (
            <div>Loading...</div> 
          ) : (
            filteredReportees.map((reportee, index) => (
              <div key={index} className="reportee-card">
                <div className="reportee-info">
                  <h4>{reportee.id} {reportee.employee}</h4>
                  <p>Reason: {reportee.reason_for_leave}</p>
                  <p className="status">
                    {reportee.status_of_leave}
                  </p>
                  <h5>Leave Dates</h5>
                  <p>From: {reportee.start_date} To: {reportee.end_date} </p>
                </div>
                {/* Approve and Reject buttons */}
                <div className="actions">
                  <button 
                    className="approve-btn" 
                    onClick={() => handleApproveReject(reportee.id, 'approve')}
                  >
                    Approve
                  </button>
                  <button 
                    className="reject-btn" 
                    onClick={() => handleApproveReject(reportee.id, 'reject')}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamReportees;
