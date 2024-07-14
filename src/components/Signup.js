import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import sideImg from './sideImg.png';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
   
    if (role === 'admin') {
      navigate('/admin-dashboard');
    } else {
      navigate('/user-dashboard');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h1>Myntra</h1>
        <h2>Welcome to India's Largest Online Fashion Store</h2>
        <p>Please signup to create an account</p>
        <form onSubmit={handleSubmit}>
          <label>Email ID</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <label>
            Role:
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <button type="submit">Signup</button>
        </form>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
      <div className="auth-image-container">
      <img src={sideImg} alt="Fashion Store" />
      </div>
    </div>
  );
};

export default Signup;
