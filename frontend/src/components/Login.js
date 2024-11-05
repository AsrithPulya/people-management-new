import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import axios from 'axios';
import '../Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/accounts/login/', {
        username,
        password,
      });

      if (response.status === 200) {
        console.log(response.data);
        navigate('/dashboard'); 
      }
    } catch (err) {
      setError('Invalid username or password'); 
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back!</h2>
        <p>Please log in to continue</p>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="forgot-password">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
