import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import '../TeamReportees.css';
import { Link } from 'react-router-dom';

const TeamReportees = () => {
  const [reportees, setReportees] = useState([]);
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState('grid');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('You are not logged in.');
      return;
    }

    // Fetch reportees data
    axios.get('http://127.0.0.1:8000/api/reportees/', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      setReportees(response.data);
    })
    .catch(error => {
      console.error('Error fetching reportees:', error);
      alert('Failed to fetch reportees. Please try again.');
    });
  }, []);

  const filteredReportees = reportees.filter(reportee => {
    return filter === 'all' || (filter === 'direct' && reportee.checkInStatus === 'Yet to check-in');
  });

  return (
    <div className="team-reportees-page">
      <Sidebar />

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
          <Link to="/team/reportees" className="sub-nav-link active">Reportees</Link>
          <Link to="/team/on-leave" className="sub-nav-link">On Leave</Link>
          <Link to="/team/leave-requests" className="sub-nav-link">Leave Requests</Link>
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
              <button onClick={() => setView('grid')} className={`toggle-btn ${view === 'grid' ? 'active' : ''}`}>Grid</button>
              <button onClick={() => setView('list')} className={`toggle-btn ${view === 'list' ? 'active' : ''}`}>List</button>
            </div>
          </div>
        </div>

        {/* Reportees Container */}
        <div className={`reportees-container ${view}`}>
          {filteredReportees.map((reportee, index) => (
            <div key={index} className="reportee-card">
              <div className="reportee-info">
              {/* Work on name */}
                <h4>{reportee.emp_code} - {reportee.name}</h4> 
                <p>Date of Birth: {reportee.date_of_birth} </p>
                <p>Phone Number: {reportee.phone_number} </p>
                <p>General : 10am - 6pm</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamReportees;
