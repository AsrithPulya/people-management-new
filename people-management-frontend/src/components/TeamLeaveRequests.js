import React, { useState } from 'react';
import Sidebar from './Sidebar';
import '../TeamReportees.css';
import { Link } from 'react-router-dom';

const TeamReportees = () => {
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState('grid');

  const reportees = [
    { id: 'HRM19', name: 'Nirav Butani', leaveStatus: 'Leave', leaveBooked: 25.0, checkInStatus: '', schedule: '9:00 AM - 6:00 PM' },
    { id: 'HRM3', name: 'Kunal Kashyap', leaveStatus: 'Leave', leaveBooked: 25.5, checkInStatus: '', schedule: '9:00 AM - 6:00 PM' },
  ];

  const filteredReportees = reportees.filter(reportee => {
    return filter === 'all' || (filter === 'direct' && reportee.checkInStatus === 'Yet to check-in');
  });

  return (
    <div className="team-reportees-page">
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
              <div className="profile-pic"></div>
              <div className="reportee-info">
                <h4>{reportee.id} - {reportee.name}</h4>
                <p className="status">
                  {reportee.leaveStatus || reportee.checkInStatus}
                </p>
                <p>{reportee.leaveBooked} Leave booked this year</p>
                <p>General - {reportee.schedule}</p>
              </div>
              <button className="contact-btn">&#9742;</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamReportees;
