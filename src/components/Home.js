import React from 'react';
import Navbar from './Navbar';
import homepageImage from '../assets/homepage.jpg';
import './Home.css'; // Import your CSS file

const Home = () => {
  return (
    <div>
      <Navbar />
      <img 
        src={homepageImage} 
        alt="Home page" 
        className="image" // Apply the CSS class
      />
    </div>
  );
}

export default Home;
