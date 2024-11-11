// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
// import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/Myspace" className="sidebar-item">
         Home
      </Link>
      <Link to="/leave-tracker" className="sidebar-item">
         Leave Tracker
      </Link>
      <Link to="/" className="sidebar-item">
         Logout
      </Link>
    </div>
  );
}

export default Sidebar;
