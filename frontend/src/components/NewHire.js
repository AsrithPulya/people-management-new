import React, { useState } from 'react';
import axios from 'axios'; // Import axios

function NewHire({ isOpen, onClose }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company] = useState('Sample Company1'); 
  const [role] = useState('Basic'); 

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/accounts/register/', {
        first_name: firstName,
        last_name: lastName,
        username: username,
        email: email,
        password: password,
        company: company,
        role: role,
      });

      console.log('User registered successfully:', response.data);
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

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
            <label>Company</label>
            <input 
              type="text" 
              value={company} 
              disabled 
            />
          </div>
          <div className="form-group">
            <label>Role</label>
            <input 
              type="text" 
              value={role} 
              disabled 
            />
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
