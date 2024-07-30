import React from 'react';
import { Card } from 'react-bootstrap';
import {Link} from'react-router-dom'

const TwoColumnLayout = () => {
  return (
    <div className="container">
      <h1 className='mt-3 mb-3'>GUIDELINES</h1>
      <div className="row">
        <div className="col-md-6 mt-6">
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>File Formats</Card.Title>
              <Card.Text>
                <ul>
                  <li>Image Files: PNG ONLY</li>
                  <li>REMOVE BACKGROUND BEFORE UPLOADING THE PNG FORM THE FOLLOWING WEBSITE ONLY:</li>
                  <li><Link to="https://www.remove.bg/">Background Remover</Link> </li>
                  
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Design Themes</Card.Title>
              <Card.Text>
                <ul>
                  <li>Sustainable Fashion</li>
                  <li>Streetwear</li>
                  <li>Luxury Fashion</li>
                  <li>Accessories</li>
                  <li>Casual</li>
                  <li>Formal</li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Sustainability Criteria</Card.Title>
              <Card.Text>
                <ul>
                  <li>Material Selection</li>
                  <li>Energy Efficiency</li>
                  <li>Waste Reduction</li>
                  <li>Water Reduction</li>
                  <li>Water Conservation</li>
                  <li>Social Responsibility</li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-6 mt-6">
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Creativity and Originality</Card.Title>
              <Card.Text>
                <ul>
                  <li>Uniqueness and Innovation</li>
                  <li>Ability to Stand Out in the Market</li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Marketability</Card.Title>
              <Card.Text>
                <ul>
                  <li>Appeal to Wide Audiences</li>
                  <li>Commercial Viability</li>
                  <li>Alignment with Current Market Trends</li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Sustainability</Card.Title>
              <Card.Text>
                <ul>
                  <li>Environmental Impact</li>
                  <li>Social Impact</li>
                  <li>End-of-Life Recyclability</li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Feasibility</Card.Title>
              <Card.Text>
                <ul>
                  <li>Technical Feasibility</li>
                  <li>Production Costs</li>
                  <li>Potential for Mass Production</li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
      
      <div className="mt-4" style={{ marginBottom: '1vh' }}>
        <p><strong>Note:</strong> In the event of a tie, the entry that was submitted earlier will be given priority.</p>
      </div>
    </div>
  );
};

export default TwoColumnLayout;
