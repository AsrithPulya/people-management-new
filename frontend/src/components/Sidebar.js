// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
// import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/" className="sidebar-item">
        <i className="icon-home"></i> Home
      </Link>
      <Link to="/leave-tracker" className="sidebar-item">
        <i className="icon-leave"></i> Leave Tracker
      </Link>
    </div>
  );
}

export default Sidebar;
