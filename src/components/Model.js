import React from 'react';
import './Model.css';

function Model({ src, className }) {
  return (
    <div className={`model ${className}`}>
      <img src={src} alt="Model" />
    </div>
  );
}

export default Model;
