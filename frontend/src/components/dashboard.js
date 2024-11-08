import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import NewHire from './NewHire';
import '../dashboard.css';

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/'); // Redirect to login if no token
    }
  }, [navigate]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
              <li><Link to="/myspace">MySpace</Link></li>
              <li><Link to="/team">Team</Link></li>
              <li><Link to="/organization">Organization</Link></li>
            </ul>
          </nav>
        </header>

        <div className="content">
          <h1>Welcome to the Dashboard</h1>
          <button className="add-employee-btn" onClick={openModal}>Add Employee</button>
        </div>
      </div>

      {/* Register User Modal */}
      <NewHire isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default Dashboard;
