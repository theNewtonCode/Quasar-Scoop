import React from 'react';
import { Link } from 'react-router-dom';
import '../Components/html and css/Header.css';

import logo from '../assets/logo.svg'; // Import your logo

const Header = ({ isAuthenticated, onLogout }) => {

  return (
    <header className="header">
      <div className="brand">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" className="logo-img" />
          Quasar Scoop
        </Link>
      </div>
      <nav className="nav">
        <Link to="/blogs" className="nav-item">All Blogs</Link>
        <Link to="/contact" className="nav-item">Contact</Link>
        <Link to="/create-blog" className="nav-item">Create a Blog</Link>
        <form className="search-form">
          <input type="text" placeholder="Search by keyword..." className="search-input" />
          <button type="submit" className="search-button">Search</button>
        </form>
      </nav>
      <div className="auth">
        {isAuthenticated ? (<>
        
          <Link to="/user/dashboard" className="nav-item">Profile</Link>
          <button onClick={onLogout} className="auth-button">Logout</button></>
        ) : (
          <Link to="/login" className="auth-button">Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
