import React from 'react';
// import './Profile.css'; // You can style your component with this CSS file
import Navbar from './Navbar'
// Import the images
import design1 from '../assets/model4.png';
import design2 from '../assets/model5.png';
import design3 from '../assets/model6.png';

// Mock profile data
const mockProfile = {
  name: "Tanya Pattnaik",
  designsSubmitted: [
    { id: 1, title: "Design 1", image: design1, votes: 120 },
    { id: 2, title: "Design 2", image: design2, votes: 85 },
    { id: 3, title: "Design 3", image: design3, votes: 200 },
  ],
  rating: 3.8,
};

function TanyaProfile() {
  const { name, designsSubmitted, rating } = mockProfile;

  return (
    <div>
    <Navbar></Navbar>
    <div className="profile-container">
      
      <div className="profile-header">
        <h1>{name}</h1>
        <div className="profile-rating">
          <h2>Rating</h2>
          <p>{rating} / 5</p>
        </div>
      </div>
      <div className="profile-info">
        <div className="profile-item">
          <h2>Designs Submitted</h2>
          <div className="designs-gallery">
            {designsSubmitted.map((design) => (
              <div key={design.id} className="design-item">
                <img src={design.image} alt={design.title} className="design-image" />
                <div className="design-info">
                  <p className="design-title">{design.title}</p>
                  <p className="design-votes">Votes: {design.votes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default TanyaProfile;