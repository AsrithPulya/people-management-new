import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Overview, DashboardContent } from "../components/tabs/index"; 
import Organization from "./Organization";

import '../dashboard.css';

function Myspace() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview'); // set default tab as 'Overview'
  const [selectedPrimaryTab, setSelectedPrimaryTab] = useState('myspace'); // new state for primary tab

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/'); // Redirect to login if no token
    }
  }, [navigate]);

  const handlePrimaryTabChange = (tab) => {
    setSelectedPrimaryTab(tab);
    if (tab === 'organization') {
      navigate('/organization'); // Navigate to /organization route
    } else {
      navigate('/myspace'); // Navigate back to /myspace if "My Space" is selected
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navigation */}
        <header className="top-nav">
          <nav>
            <ul className="top-nav-links">
              <li>
                <div
                  className={`tab-link ${selectedPrimaryTab === "myspace" ? "active" : ""}`}
                  onClick={() => handlePrimaryTabChange("myspace")}
                >
                  My Space
                </div>
              </li>
              <li>
                <div
                  className={`tab-link ${selectedPrimaryTab === "organization" ? "active" : ""}`}
                  onClick={() => handlePrimaryTabChange("organization")}
                >
                  Organization
                </div>
              </li>
            </ul>
          </nav>
        </header>

        <div className="content">
          {selectedPrimaryTab === 'myspace' && (
            <>
              {/* Tab Navigation */}
              <ul className="tab">
                <li className={`c-pointer tab-link pr-4 ${activeTab === 'Overview' ? 'active' : ''}`} onClick={() => setActiveTab('Overview')}>Overview</li>
                <li className={`c-pointer tab-link ${activeTab === 'Dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('Dashboard')}>Dashboard</li>
              </ul>

              {/* Render Components Based on Active Tab */}
              <div className="tab-content">
                {activeTab === 'Overview' && <Overview />}
                {activeTab === 'Dashboard' && <DashboardContent />}
              </div>
            </>
          )}

          {selectedPrimaryTab === 'organization' && (
            <Organization />   
          )}
        </div>
      </div>
    </div>
  );
}

export default Myspace;
