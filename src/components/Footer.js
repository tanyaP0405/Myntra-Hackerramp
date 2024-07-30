// Footer.js
import React from 'react';
import './Footer.css'; // Import the CSS file for styling

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-section">
        <h4>ONLINE SHOPPING</h4>
        <ul>
          <li>Men</li>
          <li>Women</li>
          <li>Kids</li>
          <li>Home & Living</li>
          <li>Beauty</li>
          <li>Gift Cards</li>
          <li>Myntra Insider</li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>USEFUL LINKS</h4>
        <ul>
          <li>Blog</li>
          <li>Careers</li>
          <li>Site Map</li>
          <li>Corporate Information</li>
          <li>Whitehat</li>
          <li>Sephora</li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>CUSTOMER POLICIES</h4>
        <ul>
          <li>Contact Us</li>
          <li>FAQ</li>
          <li>T&C</li>
          <li>Terms Of Use</li>
          <li>Track Orders</li>
          <li>Shipping</li>
          <li>Cancellation</li>
          <li>Returns</li>
          <li>Privacy Policy</li>
          <li>Grievance Officer</li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>EXPERIENCE MYNTRA APP ON MOBILE</h4>
        <div className="app-links">
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" />
          {/* <img src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg" alt="App Store" /> */}
        </div>
        {/* <h4>KEEP IN TOUCH</h4> */}
       
      </div>
      <div className="footer-section">
        <div className="guarantee">
          <h4>100% ORIGINAL</h4>
          <p>guarantee for all products at myntra.com</p>
        </div>
        <div className="return-policy">
          <h4>Return within 14 days</h4>
          <p>of receiving your order</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
