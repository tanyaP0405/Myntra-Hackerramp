import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './DesignView.css';
import Navbar from './Navbar';

function DesignView() {
  const navigate = useNavigate();
  const location = useLocation();
  const { model } = location.state || {};

  if (!model) {
    return (
      <div className="design-view">
        <Navbar />
        <div className="design-view-content">
          <button className="back-button" onClick={() => navigate('/user-dashboard-poll')}>
            ← Back
          </button>
          <h1>No Design Data Available</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="design-view">
      <Navbar />
      <div className="design-view-content">
        <button className="back-button" onClick={() => navigate('/user-dashboard-poll')}>
          ← Back
        </button>
        <h1>View Design</h1>
        <div className="design-content">
          <div className="model-view">
            <img src={`http://localhost:5000/${model.sketch}`} alt={model.title} className="design-image" />
            <div className="design-details">
              <h2>{model.title}</h2>
              <p><strong>Designed by:</strong> {model.name}</p>
            </div>
          </div>
          <div className="material-details">
            <h2>Category</h2>
            <p>{model.category}</p>
            <h2>Material Details</h2>
            <p>{model.materialDescription || 'N/A'}</p>
            <h2>Sustainability Features</h2>
            <p>{model.sustainabilityFeatures}</p>
          </div>
        </div>
        <button className="vote-btn" onClick={() => alert('Vote button clicked')}>
          Vote
        </button>
        <div className="expected-price">Votes</div>
      </div>
    </div>
  );
}

export default DesignView;
