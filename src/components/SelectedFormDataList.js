import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormCard from './FormCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SelectedFormDataList = ({ selectedDesigns }) => {
  const [selectedFormdatas, setSelectedFormdatas] = useState([]);

  useEffect(() => {
    const fetchSelectedFormdatas = async () => {
      try {
        if (selectedDesigns.length > 0) {
          const response = await axios.post('http://localhost:5000/formdatas/selected', { selectedDesigns });
          setSelectedFormdatas(response.data);
        } else {
          setSelectedFormdatas([]);
        }
      } catch (error) {
        console.error('Error fetching selected form data:', error);
      }
    };

    fetchSelectedFormdatas();
  }, [selectedDesigns]);

  return (
    <Container>
      <Row>
        {selectedFormdatas.map((formdata) => (
          <Col key={formdata._id} sm={12} md={6} lg={4}>
            <FormCard formdata={formdata} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SelectedFormDataList;
