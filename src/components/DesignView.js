import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './DesignView.css';
import Navbar from './Navbar';


function DesignView() {
  const navigate = useNavigate();
  const location = useLocation();
  const { model } = location.state || {}; 
  const [votes, setVotes] = useState(0); 
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (model && model.votes) {
      setVotes(model.votes); 
    }
  }, [model]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 1000);

      return () => clearTimeout(timer); // Cleanup timeout on component unmount
    }
  }, [errorMessage]);

  const handleVote = async () => {
    const token = localStorage.getItem('token'); // Adjust based on where you store the token
  
    try {
      const response = await fetch(`http://localhost:5000/formdatas/vote/${model._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token in the headers
        },
        body: JSON.stringify({}),
      });
  
      if (!response.ok) {
        if (response.status === 403) { // Assuming 403 is returned for "already voted" case
          setErrorMessage('You have already voted.');
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } else {
        const data = await response.json();
        console.log('Vote response:', data);
  
        setVotes(data.updatedVotes);
  
        navigate('/leaderboard', { state: { model } });
      }
    } catch (error) {
      console.error('Error voting:', error);
      if (!errorMessage) setErrorMessage('An error occurred. Please try again.');
    }
  };
  
  if (!model) {
    return (
      <div className="design-view">
        <Navbar />
        <button className="back-button" onClick={() => navigate('/user-dashboard-poll')}>
          ← Back
        </button>
        <h1>No Design Data Available</h1>
      </div>
    );
  }

  return (
    <div className="design-view">
      <Navbar />
      <button className="back-button" onClick={() => navigate('/user-dashboard-poll')}>
        ← Back
      </button>
      {/* Jumbotron Section */}
      <div className="jumbotron jumbotron-fluid" style={{ backgroundColor: 'orange' }}>
        <div className="container">
          <h1 className="display-4">VIEW DESIGN</h1>
        </div>
      </div>
      <div className="design-content">
        <div className="design-details">
          <h2>{model.title}</h2>
          <p><strong>Designed by:</strong> {model.name}</p>
        </div>
        <img src={`http://localhost:5000/${model.sketch}`} alt={model.title} className="design-image" />
        <div className="material-details">
          <h2>Category</h2>
          <p>{model.category}</p>
          <h2>Material Details</h2>
          <p>{model.materialDescription || 'N/A'}</p>
          <h2>Sustainability Features</h2>
          <p>{model.sustainabilityFeatures}</p>
        </div>
      </div>
      <div className="vote-container" style={{ height: '30vh' }}>
        <button className="vote-btn" onClick={handleVote}>Vote</button>
        <div className="expected-price"><p>Votes: {votes}</p></div>
      </div>
      
      {errorMessage && (
        <div className={`error-message ${errorMessage ? 'show' : ''}`}>
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default DesignView;
