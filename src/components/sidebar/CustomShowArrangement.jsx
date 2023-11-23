import React from 'react';

export default function CustomShowArrangement({ activeButton, handleButtonClick }) {
  return (
    <div style={{ display: 'grid', gap: '15px', width: '140px', zIndex: '1'}}>
      <button
        className={`w3-btn w3-${activeButton === 'Default' ? 'blue' : 'white'}`}
        onClick={() => handleButtonClick('Default')} style={{ color: 'white' }}
      >
        Default
      </button>
      <button
        className={`w3-btn w3-${activeButton === 'A-Z' ? 'blue' : 'white'}`}
        onClick={() => handleButtonClick('A-Z')} style={{ color: 'white' }}
      >
        A-Z
      </button>
      <button
        className={`w3-btn w3-${activeButton === 'Z-A' ? 'blue' : 'white'}`}
        onClick={() => handleButtonClick('Z-A')} style={{ color: 'white' }}
      >
        Z-A
      </button>
      <button
        className={`w3-btn w3-${activeButton === 'Latest date' ? 'blue' : 'white'}`}
        onClick={() => handleButtonClick('Latest date')} style={{ color: 'white' }}
      >
        Latest date
      </button>
      <button
        className={`w3-btn w3-${activeButton === 'Oldest date' ? 'blue' : 'white'}`}
        onClick={() => handleButtonClick('Oldest date')} style={{ color: 'white' }}
      >
        Oldest date
      </button>
    </div>
  );
}
