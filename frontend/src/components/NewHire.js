import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NewHire({ isOpen, onClose }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [managerList, setManagerList] = useState([]);
  const [reportingManager, setReportingManager] = useState(null);

  useEffect(() => {
    if (isOpen) {
      const token = localStorage.getItem('accessToken');

      // Fetch the list of usernames for reporting manager dropdown
      axios.get('http://127.0.0.1:8000/accounts/reporting-managers/', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setManagerList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('accessToken');

    try {
      const response = await axios.post('http://127.0.0.1:8000/accounts/register/', {
        first_name: firstName,
        last_name: lastName,
        username: username,
        email: email,
        password: password,
        reporting_manager: reportingManager,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('User registered successfully:', response.data);
      onClose();
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <header className="modal-header">
          <h2>Register User</h2>
          <button className="close-button" onClick={onClose}>X</button>
        </header>
        <form className="register-user-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name *</label>
            <input 
              type="text" 
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Last Name *</label>
            <input 
              type="text" 
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Username *</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Password *</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Reporting Manager</label>
            <select 
              value={reportingManager} 
              onChange={(e) => setReportingManager(e.target.value)} 
              required
            >
              <option value="">Select Manager</option>
              {managerList.map((manager) => (
                <option key={manager.id} value={manager.id}>
                  {manager.username}
                </option>
              ))}
            </select>
          </div>
          <div className="modal-actions">
            <button type="submit" className="submit-btn">Register</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );  
}

export default NewHire;
