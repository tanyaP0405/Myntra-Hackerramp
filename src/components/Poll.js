import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Poll.css';
import './Model.css';
import Model from './Model';
import Navbar from './Navbar';
import Banner from './Banner';
import DesignerCarousel from './Topdesigner';
// import Footer from './Footer';

function Poll() {
  const [models, setModels] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(2);
  const [animating, setAnimating] = useState(false);
  const [selectedGender, setSelectedGender] = useState('all'); // Gender filter state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSelectedModels = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        // Include selectedGender in the query parameters
        const response = await axios.get('http://localhost:5000/formdatas', {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          params: {
            isSelected: true,
            gender: selectedGender === 'all' ? undefined : selectedGender // Send gender only if it's not 'all'
          }
        });

        console.log('API Response:', response.data);
        setModels(response.data);
      } catch (error) {
        console.error('Error fetching selected models:', error);
      }
    };

    fetchSelectedModels();
  }, [selectedGender]); // Re-fetch when selectedGender changes

  const handlePrevClick = () => {
    if (!animating && filteredModels.length > 0) {
      setAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? filteredModels.length - 1 : prevIndex - 1));
      setTimeout(() => setAnimating(false), 500);
    }
  };

  const handleNextClick = () => {
    if (!animating && filteredModels.length > 0) {
      setAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex === filteredModels.length - 1 ? 0 : prevIndex + 1));
      setTimeout(() => setAnimating(false), 500);
    }
  };

  const getIndices = (index) => {
    const length = filteredModels.length;
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

  const filteredModels = models.filter(model => 
    selectedGender === 'all' || model.gender === selectedGender
  );

  const [prevPrevIndex, prevIndex, currentIndexMid, nextIndex, nextNextIndex] = getIndices(currentIndex);

  const handleVoteNow = () => {
    navigate('/view-design', { state: { model: filteredModels[currentIndexMid] } });
  };

  return (
    <div>
    <div>
      <Navbar />
      <Banner />
      <section className="poll" style={{ height: '80vh' }}>
        <div className="gender-filter">
          <label htmlFor="gender">Filter by Gender:</label>
          <select
            id="gender"
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
          >
            <option value="all">All</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Boys">Boys</option>
            <option value="Girls">Girls</option>
          </select>
        </div>
        <div className="carousel">
          <button className="carousel-btn left-btn" onClick={handlePrevClick} disabled={animating}>←</button>
          <div className="carousel-inner">
            <Model src={filteredModels[prevPrevIndex]?.sketch ? `http://localhost:5000/${filteredModels[prevPrevIndex].sketch}` : ''} className="model model-prev-prev" />
            <Model src={filteredModels[prevIndex]?.sketch ? `http://localhost:5000/${filteredModels[prevIndex].sketch}` : ''} className="model model-prev" />
            <Model src={filteredModels[currentIndexMid]?.sketch ? `http://localhost:5000/${filteredModels[currentIndexMid].sketch}` : ''} className="model model-current" />
            <Model src={filteredModels[nextIndex]?.sketch ? `http://localhost:5000/${filteredModels[nextIndex].sketch}` : ''} className="model model-next" />
            <Model src={filteredModels[nextNextIndex]?.sketch ? `http://localhost:5000/${filteredModels[nextNextIndex].sketch}` : ''} className="model model-next-next" />
          </div>
          <button className="carousel-btn right-btn" onClick={handleNextClick} disabled={animating}>→</button>
        </div>
        <div className="poll-actions">
          <button className="view-btn" onClick={() => navigate('/view-design', { state: { model: filteredModels[currentIndexMid] } })}>View</button>
          <button className="view-btn" onClick={handleVoteNow}>Vote</button>
        </div>
      </section>

    </div>

<DesignerCarousel></DesignerCarousel>
</div>
  );
}

export default Poll;
