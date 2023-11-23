import React from 'react';
import './Navbar.css';

export default function NavbarComponent() {
  return (
  <nav className="nav--bar">
    <img src="/src/images/icon.png" className='nav--icon'/>
    <h3 className="nav--logo_text">G-M-M World</h3>
    <button className="sign-out-btn" type="submit">Sign Out</button>
    </nav>
  );
}
