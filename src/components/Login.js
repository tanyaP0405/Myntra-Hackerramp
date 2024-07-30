import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // Ensure you import your CSS
import sideImg from './sideImg.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check for specific password "12345"
    if (password === '12345') {
      setError('Invalid credentials');
      console.log('Password is 12345');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        setError('Invalid credentials'); // Display a generic error message
        console.log('Server responded with error');
        return;
      }
  
      const { token } = await response.json();
      localStorage.setItem('token', token); // Save token to localStorage
  
      // Optionally decode the token to get user role
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const userRole = decodedToken.role;
  
      if (userRole === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/home');
      }
    } catch (err) {
      setError('Invalid credentials'); // Display a generic error message
      console.error('Error during login:', err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h1>Myntra</h1>
        <h2>Welcome to India's Largest Online Fashion Store</h2>
        <p>Please login to your account</p>
       
        <form onSubmit={handleSubmit}>
          <label>Email ID</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="auth-options">
            <label style={{ marginRight: '10px' }}>
              <input type="checkbox" /> Keep me signed in
            </label>
            <a href="/forgot-password">Forgot Password?</a>
          </div>
          <button type="submit">Login</button>
         
        </form>
        <p>
          Don't have an account? <a href="/signup">Signup</a>
        </p>
        
            <div className="m" style={{ color: 'red', marginTop: '10px',textAlign: 'center' }}>
              {error}
            </div>
          
      </div>
      <div className="auth-image-container">
        <img src={sideImg} alt="Fashion Store" />
      </div>
    </div>
    
  );
};

export default Login;




