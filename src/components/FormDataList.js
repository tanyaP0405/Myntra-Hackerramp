import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import FormCard from './FormCard';

const FormDataList = () => {
  const [formdatas, setFormdatas] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState(''); 
  const [showSelectedOnly, setShowSelectedOnly] = useState(false); 

  useEffect(() => {
    fetchData();
  }, [categoryFilter, showSelectedOnly]);

  const fetchData = async () => {
    try {
      let url = 'http://localhost:5000/formdatas';

      
      if (categoryFilter) {
        url += `?category=${categoryFilter}`;
      }
      if (showSelectedOnly) {
        url += `${categoryFilter ? '&' : '?'}selected=true`;
      }

      const response = await axios.get(url);
      setFormdatas(response.data);
    } catch (error) {
      console.error('Error fetching the form data:', error);
    }
  };

  return (
    <Container>
   
      <div className="filter-section">
        

        <div className="form-check mt-3">
          <input
            type="checkbox"
            id="showSelectedOnly"
            className="form-check-input"
            checked={showSelectedOnly}
            onChange={(e) => setShowSelectedOnly(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="showSelectedOnly">
            Show Selected Only
          </label>
        </div>
      </div>

   
      <Row>
        {formdatas.map((formdata) => (
          <Col key={formdata._id} sm={12} md={6} lg={4}>
            <FormCard formdata={formdata} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FormDataList;
