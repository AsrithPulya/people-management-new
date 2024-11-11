import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import NewHire from './NewHire';
import '../dashboard.css';

function Organization() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/'); 
    }
  }, [navigate]);


  return (
    <div className="dashboard">
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navigation */}
        <header className="top-nav">
          <nav>
            <ul className="top-nav-links">
              <li><Link to="/Myspace">MySpace</Link></li>
              <li><Link to="/Organization">Organization</Link></li>
            </ul>
          </nav>
        </header>

        <div className="content">
          <h1>This is Organization</h1>
        </div>
      </div>
    </div>
  );
}

export default Organization;
