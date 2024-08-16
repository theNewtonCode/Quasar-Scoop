import React from 'react';
import { Link } from 'react-router-dom';
import '../Components/html and css/Header.css';

const Header = () => {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/signup" className="navbar-link">Signup</Link>
          </li>
          <li className="navbar-item">
            <Link to="/login" className="navbar-link">Login</Link>
          </li>
        </ul>
      </nav>
      <div className="watermark">
          <h2>Designed and Developed by <Link to={"https://github.com/theNewtonCode"}>theNewtonCode.</Link></h2>
        </div>
    </div>
  );
};

export default Header;