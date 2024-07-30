import React, { useState } from 'react';
import { Form, Button, Col, Container, Row, Card } from 'react-bootstrap';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const [formData, setFormData] = useState({
   
    name: '',
    email: '',
    // portfolio: '',

  
    title: '',
    description: '',
    category: '',
    gender:'',
  
    sketch: null, 
    // video: null,

 
    materialDescription: '',
    sustainabilityFeatures: [],


    confirm: false,
  });
  const [errors, setErrors] = useState({});

  const categories = ['Sustainable Fashion', 'Streetwear', 'Luxury Fashion', 'Accessories', 'Casual','Formal'];
  const sustainabilityOptions = ['Recycled Materials', 'Energy Efficient', 'Biodegradable', 'Locally Sourced'];
  const genders=['Men','Women','Girls','Boys']

  const handleNextStep = () => {
    const currentErrors = validateStep(step);
    if (Object.keys(currentErrors).length === 0) {
      setStep(step + 1);
      setErrors({});
    } else {
      setErrors(currentErrors);
    }
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  
  
    const handleChange = (e) => {
      const { name, value, type, checked, files } = e.target;
    
      if (type === 'file') {
        setFormData({
          ...formData,
          [name]: files[0], 
        });
      } else if (name === 'confirm') {
        setFormData({
          ...formData,
          confirm: checked,
        });
      } else if (type === 'checkbox') {
        if (checked) {
          setFormData({
            ...formData,
            sustainabilityFeatures: [...formData.sustainabilityFeatures, value],
          });
        } else {
          setFormData({
            ...formData,
            sustainabilityFeatures: formData.sustainabilityFeatures.filter(item => item !== value),
          });
        }
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      const currentErrors = validateStep(step);
      if (Object.keys(currentErrors).length === 0) {
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
          if (formData[key] !== null) {
            if (Array.isArray(formData[key])) {
              formData[key].forEach(item => formDataToSend.append(key, item));
            } else {
              formDataToSend.append(key, formData[key]);
            }
          }
        });
    
        try {
          const token = localStorage.getItem('token'); // Retrieve token from local storage
    
          const response = await fetch('http://localhost:5000/submit', {
            method: 'POST',
            body: formDataToSend,
            headers: {
              'Authorization': `Bearer ${token}`, // Add the authorization header
            },
          });
    
          if (response.ok) {
            console.log('Form Submitted', formData);
            setSubmissionStatus('success');
          } else {
            const errorData = await response.json();
            console.error('Server Error:', errorData);
            setSubmissionStatus('error');
          }
        } catch (error) {
          console.error('Fetch Error:', error);
          setSubmissionStatus('error');
        }
      } else {
        setErrors(currentErrors);
      }
    };
    

  const validateStep = (currentStep) => {
    const newErrors = {};
    switch (currentStep) {
      case 1:
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
     
        // if (!formData.portfolio) newErrors.portfolio = 'Portfolio link is required';
        break;
      case 2:
        if (!formData.title) newErrors.title = 'Title is required';
        if (!formData.description) newErrors.description = 'Description is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';

        break;
      case 3:
        break;
      case 4:
        if (!formData.materialDescription) newErrors.materialDescription = 'Material description is required';
        if (formData.sustainabilityFeatures.length === 0) newErrors.sustainabilityFeatures = 'Select at least one sustainability feature';
        break;
      case 5:
        if (!formData.confirm) newErrors.confirm = 'Please confirm before submitting';
        break;
      default:
        break;
    }
    return newErrors;
  };


    return (
      <Container style={{ margin: '5vw auto' }}>
        {submissionStatus === 'success' ? (
          <div className="text-center">
            <h2>Your design has been sent for review.</h2>
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            <h2 className="text-center">Step {step}</h2>
            {step === 1 && (
              <div>
                <Form.Group as={Row} controlId="formName">
                  <Form.Label column sm={2}>Name</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
    
                <Form.Group as={Row} controlId="formEmail">
                  <Form.Label column sm={2}>Email</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
    
                
              </div>
            )}
    
            {step === 2 && (
              <div>
                <Form.Group as={Row} controlId="formTitle">
                  <Form.Label column sm={2}>Title</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter title"
                      isInvalid={!!errors.title}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.title}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
    
                <Form.Group as={Row} controlId="formDescription">
                  <Form.Label column sm={2}>Description</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Enter description"
                      isInvalid={!!errors.description}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.description}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formGender">
                  <Form.Label column sm={2}>Gender</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      as="select"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      isInvalid={!!errors.gender}
                    >
                      <option value="">Select gender...</option>
                      {genders.map((gender) => (
                        <option key={gender} value={gender}>
                          {gender}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.gender}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
    
                <Form.Group as={Row} controlId="formCategory">
                  <Form.Label column sm={2}>Category</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      as="select"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      isInvalid={!!errors.category}
                    >
                      <option value="">Select category...</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.category}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
              </div>
            )}
    
            {step === 3 && (
              <div>
                <h3>Step 3: Upload Files</h3>
                <Form.Group as={Row} controlId="formSketch">
                  <Form.Label column sm={2}>Sketch</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="file"
                      name="sketch"
                      onChange={handleChange}
                      isInvalid={!!errors.sketch}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.sketch}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
    
               
              </div>
            )}
    
            {step === 4 && (
              <div>
                <h3>Step 4: Materials and Sustainability</h3>
                <Form.Group as={Row} controlId="formMaterialDescription">
                  <Form.Label column sm={2}>Material Description</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="materialDescription"
                      value={formData.materialDescription}
                      onChange={handleChange}
                      placeholder="Enter material description"
                      isInvalid={!!errors.materialDescription}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.materialDescription}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
    
                <Form.Group as={Row} controlId="formSustainabilityFeatures">
                  <Form.Label column sm={2}>Sustainability Features</Form.Label>
                  <Col sm={10}>
                    {sustainabilityOptions.map((option) => (
                      <Form.Check
                        key={option}
                        type="checkbox"
                        id={`checkbox-${option}`}
                        label={option}
                        value={option}
                        checked={formData.sustainabilityFeatures.includes(option)}
                        onChange={handleChange}
                      />
                    ))}
                    <Form.Control.Feedback type="invalid">
                      {errors.sustainabilityFeatures}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
              </div>
            )}
    
            {step === 5 && (
              <div>
                <h3>Step 5: Final Review</h3>
                <Card>
                  <Card.Body>
                    <Card.Title>Designer Details</Card.Title>
                    <Card.Text>
                      <strong>Name:</strong> {formData.name}<br />
                      <strong>Email:</strong> {formData.email}<br />
                      
                    </Card.Text>
                  </Card.Body>
                </Card>
    
                <Card className="mt-3">
                  <Card.Body>
                    <Card.Title>Design Details</Card.Title>
                    <Card.Text>
                      <strong>Title:</strong> {formData.title}<br />
                      <strong>Description:</strong> {formData.description}<br />
                      <strong>Gender:</strong> {formData.gender}<br />
                      <strong>Category:</strong> {formData.category}<br />
                    </Card.Text>
                  </Card.Body>
                </Card>
    
                <Card className="mt-3">
                  <Card.Body>
                    <Card.Title>Uploaded Files</Card.Title>
                    <Card.Text>
                      <strong>Sketch:</strong> {formData.sketch ? formData.sketch.name : 'Not uploaded'}<br />
                      {/* <strong>Video:</strong> {formData.video ? formData.video.name : 'Not uploaded'}<br /> */}
                    </Card.Text>
                  </Card.Body>
                </Card>
    
                <Card className="mt-3">
                  <Card.Body>
                    <Card.Title>Materials and Sustainability</Card.Title>
                    <Card.Text>
                      <strong>Material Description:</strong> {formData.materialDescription}<br />
                      <strong>Sustainability Features:</strong> {formData.sustainabilityFeatures.join(', ')}<br />
                    </Card.Text>
                  </Card.Body>
                </Card>
    
                <Form.Group className="mt-3" controlId="formConfirm">
                  <Form.Check
                    type="checkbox"
                    label="I confirm that all information provided is accurate."
                    name="confirm"
                    checked={formData.confirm}
                    onChange={handleChange}
                    isInvalid={!!errors.confirm}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirm}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            )}
    
            <div className="mt-3">
              {step > 1 && (
                <Button variant="secondary" onClick={handlePreviousStep}>
                  Previous
                </Button>
              )}
              {step < 5 ? (
                <Button variant="primary" onClick={handleNextStep} className="ml-2">
                  Next
                </Button>
              ) : (
                <Button variant="success" type="submit" className="ml-2">
                  Submit
                </Button>
              )}
            </div>
          </Form>
        )}
      </Container>
    
    
  );
};

export default MultiStepForm;
