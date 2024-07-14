import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Model from './Model';
import './Leaderboard.css';

const Leaderboard = () => {
  const [models, setModels] = useState([]);

  useEffect(() => {
    const fetchSelectedModels = async () => {
      try {
        const response = await axios.get('http://localhost:5000/formdatas?isSelected=true');
        console.log('API Response:', response.data);
        setModels(response.data);
      } catch (error) {
        console.error('Error fetching selected models:', error);
      }
    };

    fetchSelectedModels();
  }, []);

  const maxVotes = Math.max(...models.map(model => model.votes));

  return (
    <div>
      <Navbar />
      <div className="jumbotron jumbotron-fluid" style={{ backgroundColor: 'orange' }}>
        <div className="container">
          <h1 className="display-4">THANKS FOR VOTING!</h1>
          <p className="lead">The final results will be declared soon</p>
        </div>
      </div>
      <section className="banner">
        <h1>CURRENT LEADERBOARD</h1>
      </section>
      <section className="leaderboard">
        <div className="grid-container">
          {models.map((model) => (
            <div key={model._id} className="grid-item">
              <Model src={model.sketch ? `http://localhost:5000/${model.sketch}` : ''} className="model-image" />
              <div className="model-details">
                <h2>{model.title}</h2>
                <div className="vote-bar">
                  <div
                    className="vote-bar-fill"
                    style={{ width: `${(model.votes / maxVotes) * 100}%` }}
                  ></div>
                </div>
                <p className="vote-count">Votes: {model.votes}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Leaderboard;
