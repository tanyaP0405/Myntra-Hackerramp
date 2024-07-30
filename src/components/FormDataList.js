import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import FormCard from './FormCard';

const FormDataList = () => {
  const [formdatas, setFormdatas] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [showSelectedOnly, setShowSelectedOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [categoryFilter, genderFilter, showSelectedOnly]);

  const fetchData = async () => {
    setLoading(true); // Start loading
    try {
      let url = 'http://localhost:5000/formdatas';

      const params = new URLSearchParams();
      if (categoryFilter) {
        params.append('category', categoryFilter);
      }
      if (genderFilter) {
        params.append('gender', genderFilter);
      }
      if (showSelectedOnly) {
        params.append('isSelected', 'true');
      }

      const token = localStorage.getItem('token'); // Retrieve the token from local storage

      const response = await axios.get(`${url}?${params.toString()}`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the headers
        },
      });

      setFormdatas(response.data);
      setLoading(false); // Stop loading
    } catch (error) {
      console.error('Error fetching the form data:', error);
      setError(error.message);
      setLoading(false); // Stop loading
    }
  };

  return (
    <Container>
      <div className="filter-section">
        {/* Gender Filter */}
        <div className="form-group">
          <label htmlFor="genderFilter">Filter by Gender:</label>
          <select
            id="genderFilter"
            className="form-control"
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
          >
            <option value="">All Genders</option>
            <option value="Women">Women</option>
            <option value="Men">Men</option>
            <option value="Boys">Boys</option>
            <option value="Girls">Girls</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="form-group">
          <label htmlFor="categoryFilter">Filter by Category:</label>
          <select
            id="categoryFilter"
            className="form-control"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Sustainable Fashion">Sustainable Fashion</option>
            <option value="Streetwear">Streetwear</option>
            <option value="Luxury Fashion">Luxury Fashion</option>
            <option value="Accessories">Accessories</option>
            <option value="Casual">Casual</option>
            <option value="Formal">Formal</option>
          </select>
        </div>

        {/* Show Selected Only Toggle */}
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

      {/* Loading Indicator */}
      {loading ? (
        <div className="text-center mt-4">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          {/* Error Message */}
          {error && (
            <div className="alert alert-danger text-center" role="alert">
              {error}
            </div>
          )}

          {/* Data Display */}
          {formdatas.length > 0 ? (
            <Row>
              {formdatas.map((formdata) => (
                <Col key={formdata._id} sm={12} md={6} lg={4}>
                  <FormCard formdata={formdata} />
                </Col>
              ))}
            </Row>
          ) : (
            <div className="text-center mt-4">
              <p>No form data found.</p>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default FormDataList;
