import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navigation */}
        <header className="top-nav">
          <nav>
            <ul className="top-nav-links"> 
              <li><Link to="/myspace">MySpace</Link></li>
              <li><Link to="/team">Team</Link></li>
              <li><Link to="/organization">Organization</Link></li>
            </ul>
          </nav>
        </header>

        <div className="content">
          <h1>Welcome to the Dashboard</h1>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
