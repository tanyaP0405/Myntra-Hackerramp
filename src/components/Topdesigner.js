import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Topdesigner.css';

const dummyDesigners = [
  
  { name: 'Manish Malhotra', rating: '4.7' },
  { name: 'John Doe', rating: '4.5' },
  { name: 'Sabyasachi Mukherjee', rating: '4.8' },
  { name: 'Ritu Kumar', rating: '4.6' },
  { name: 'Tarun Tahiliani', rating: '4.9' },
  { name: 'Giorgio Armani', rating: '4.4' },
];

// Define a set of background colors or gradients
const backgrounds = [
  'linear-gradient(#F61CB3, #F45412)',
  'linear-gradient(#12F6D0, #F4F412)',
  'linear-gradient(#F4A912, #12A9F4)',
  'linear-gradient(#F412C6, #12F4A9)',
  'linear-gradient(#F4D012, #D0F412)',
  'linear-gradient(#D012F4, #F4A912)'
];

function DesignerCarousel() {
  const [slideIndex, setSlideIndex] = useState(0);
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % dummyDesigners.length);
    }, 2000); // Change slide every 2 seconds

    return () => clearInterval(timer);
  }, []);

  const handleNameClick = () => {
    navigate('/myProfile'); // Navigate to /myProfile
  };

  return (
    <div className="carousel-wrapper">
      <div className="carousel-title">Top Designers</div>
      <div className="slideshow-container">
        {dummyDesigners.map((designer, index) => (
          <div
            key={index}
            className={`mySlides ${index === slideIndex ? 'fade active' : 'fade'}`}
            style={{ background: backgrounds[index % backgrounds.length] }}
          >
            <div className="designer-card">
              <h3 onClick={handleNameClick} style={{ cursor: 'pointer' }}>{designer.name}</h3> {/* Add onClick event */}
              <p>Rating: {designer.rating}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="dot-container">
        {dummyDesigners.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === slideIndex ? 'active' : ''}`}
            onClick={() => setSlideIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default DesignerCarousel;
