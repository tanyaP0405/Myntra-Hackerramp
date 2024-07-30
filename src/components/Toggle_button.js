import React, { useState } from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import MultiStepForm from './Form';
import TwoColumnLayout from './Grid';

const Toggle = () => {
  const [radioValue, setRadioValue] = useState('1');

  const radios = [
    { name: 'Submit a design', value: '1' },
    { name: 'View Guidelines', value: '2' },
  ];

  const buttonStyle = {
    backgroundColor: 'rgb(242,36,178)',
    borderColor: 'rgb(242,36,178)',
    color: 'white',
  };

  const activeButtonStyle = {
    backgroundColor: 'rgb(230, 34, 169)',
    borderColor: 'rgb(230, 34, 169)',
    color: 'white',
  };

  return (
    <div>
      <div className="d-flex justify-content-center my-3">
        <ButtonGroup toggle className="btn-group-lg">
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              type="radio"
              variant="secondary"
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
              style={radioValue === radio.value ? activeButtonStyle : buttonStyle}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </div>
      <div style={{ height: '60vh' }}>
        {radioValue === '1' && (
          <div >
           
            <MultiStepForm></MultiStepForm>
            
          </div>
        )}
        {radioValue === '2' && (
          <div style={{ textAlign: 'center' }}>
           <TwoColumnLayout></TwoColumnLayout>
          </div>
        )}
      </div>
    </div>
  );
};

export default Toggle;
