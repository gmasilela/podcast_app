import React from 'react';
import './Sidebar.css';

export default function Sidebar({ children }) {
  return (
    <div className="w3-sidebar w3-bar-block w3-card w3-animate-left" style={{ width: '180px', position: 'relative' }}>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        {children}
      </ul>
      <hr />
    </div>
  );
}
