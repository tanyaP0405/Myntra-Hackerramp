import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Poll.css';
import './Model.css';
import Model from './Model';
import Navbar from './Navbar';
import Banner from './Banner';

function Poll() {
  const [models, setModels] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(2);
  const [animating, setAnimating] = useState(false);
  const navigate = useNavigate();

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

  const handlePrevClick = () => {
    if (!animating && models.length > 0) {
      setAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? models.length - 1 : prevIndex - 1));
      setTimeout(() => setAnimating(false), 500);
    }
  };

  const handleNextClick = () => {
    if (!animating && models.length > 0) {
      setAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex === models.length - 1 ? 0 : prevIndex + 1));
      setTimeout(() => setAnimating(false), 500);
    }
  };

  const getIndices = (index) => {
    const length = models.length;
    const prevPrevIndex = (index - 2 + length) % length;
    const prevIndex = (index - 1 + length) % length;
    const currentIndexMid = index;
    const nextIndex = (index + 1) % length;
    const nextNextIndex = (index + 2) % length;
    return [prevPrevIndex, prevIndex, currentIndexMid, nextIndex, nextNextIndex];
  };

  if (models.length === 0) {
    return <div>Loading...</div>;
  }

  const [prevPrevIndex, prevIndex, currentIndexMid, nextIndex, nextNextIndex] = getIndices(currentIndex);

  const handleVoteNow = async () => {
    try {
      const votedModelId = models[currentIndexMid]._id;
      const response = await axios.post(`http://localhost:5000/formdatas/vote/${votedModelId}`);
      const updatedVotes = response.data.updatedVotes;

      // Update the votes in the frontend state
      setModels((prevModels) =>
        prevModels.map((model) =>
          model._id === votedModelId ? { ...model, votes: updatedVotes } : model
        )
      );

      // Navigate to the leaderboard page
      navigate('/leaderboard');
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <Banner />
      <section className="poll">
        <div className="carousel mt-0">
          <button className="carousel-btn left-btn" onClick={handlePrevClick} disabled={animating}>←</button>
          <div className="carousel-inner">
            <Model src={models[prevPrevIndex]?.sketch ? `http://localhost:5000/${models[prevPrevIndex].sketch}` : ''} className="model-prev-prev" />
            <Model src={models[prevIndex]?.sketch ? `http://localhost:5000/${models[prevIndex].sketch}` : ''} className="model-prev" />
            <Model src={models[currentIndexMid]?.sketch ? `http://localhost:5000/${models[currentIndexMid].sketch}` : ''} className="model-current" />
            <Model src={models[nextIndex]?.sketch ? `http://localhost:5000/${models[nextIndex].sketch}` : ''} className="model-next" />
            <Model src={models[nextNextIndex]?.sketch ? `http://localhost:5000/${models[nextNextIndex].sketch}` : ''} className="model-next-next" />
          </div>
          <button className="carousel-btn right-btn" onClick={handleNextClick} disabled={animating}>→</button>
        </div>
        <div className="poll-actions">
          <button className="view-btn" onClick={() => navigate('/view-design', { state: { model: models[currentIndexMid] } })}>View</button>
          <button className="view-btn" onClick={handleVoteNow}>Vote</button>
        </div>
      </section>
    </div>
  );
}

export default Poll;
