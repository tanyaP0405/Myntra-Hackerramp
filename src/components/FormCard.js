import React, { useState } from 'react';
import './FormCard.css';
import axios from 'axios';

const FormCard = ({ formdata }) => {
  const [isSelected, setIsSelected] = useState(formdata.isSelected || false);

  const updateSelectedStatus = async (formDataId, selectedStatus) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
  
      await axios.put(
        `http://localhost:5000/formdatas/${formDataId}`,
        { isSelected: selectedStatus },
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Add authorization header
          },
        }
      );
  
      setIsSelected(selectedStatus);
    } catch (error) {
      console.error('Error updating selected status:', error);
      // Optionally handle the error (e.g., show a notification to the user)
    }
  };
  

  const handleCheckboxChange = () => {
    const newSelected = !isSelected;
    updateSelectedStatus(formdata._id, newSelected);
  };

  return (
    <div className={`form-card ${isSelected ? 'selected' : ''}`}>
      <h3 className="form-card-title">{formdata.title}</h3>
      {formdata.sketch && (
        <img src={`http://localhost:5000/${formdata.sketch}`} alt={formdata.title} className="form-card-image" />
      )}
      <p><strong>Category:</strong> {formdata.category}</p>
      <p><strong>Materials Used:</strong> {formdata.materialDescription}</p>
      <div className="sustainability-features">
        <strong>Sustainability Features:</strong>
        <ul>
          {formdata.sustainabilityFeatures.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
      <div className="form-card-checkbox">
        <input
          type="checkbox"
          id={`select-${formdata._id}`}
          checked={isSelected}
          onChange={handleCheckboxChange}
        />
        <label htmlFor={`select-${formdata._id}`} className="form-card-label">Selected</label>
      </div>
      <p className="form-card-username">Submitted by: {formdata.name}</p>
    </div>
  );
};

export default FormCard;
