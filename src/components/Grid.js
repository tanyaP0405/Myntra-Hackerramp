import React from 'react';
import { Card } from 'react-bootstrap';

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
                    <li>Image Files: JPEJ,PNG,TIFF</li>
                    <li>Vector Files: AI,EPS,SVG</li>
                    <li>3D Files: STL,OBJ,FBX</li>
                    <li>Document Files:PDF,DOCX,TXT</li>
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
                    <li>StreetWear</li>
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
                    <li>Waste reduction</li>
                    <li>Water reduction</li>
                    <li>Water Conservation</li>
                    <li>Social responsibilty</li>
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
                    <li>Ability to stand out in the market</li>
                 </ul>
                </Card.Text>
              </Card.Body>
            </Card>
        

        <Card className="mt-3">
              <Card.Body>
                <Card.Title>Marketability</Card.Title>
                <Card.Text>
                 <ul>
                    <li>Appeal to wide audiences</li>
                    <li>Commercial Viability</li>
                    <li>Alignment with the current market trends</li>
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
                    <li>End-of-Life recycleability</li>
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
                    <li>Potential for mass Production</li>
                 </ul>
                </Card.Text>
              </Card.Body>
            </Card>
        </div>
        
      </div>
    </div>
  );
};

export default TwoColumnLayout;
