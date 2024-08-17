import React, { useState } from 'react';
import { base_url } from '../api';
import { Link, useNavigate } from 'react-router-dom';
import '../Components/html and css/Header.css';

import logo from '../assets/logo.svg'; // Import your logo

const Header = ({ isAuthenticated, onLogout, username }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();
  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      // Redirect to search results page with the keyword as query parameter
      navigate(`${base_url}/search?keyword=${encodeURIComponent(searchKeyword)}`);
    }
  };

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
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search by keyword..."
            className="search-input"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <button type="submit" className="search-button">Search</button>
        </form>
      </nav>
      <div className="auth">
        {isAuthenticated ? (<>
        
          <Link to="/user/dashboard" className="nav-item">{username}</Link>
          <button onClick={onLogout} className="auth-button">Logout</button></>
        ) : (<>
          <Link to="/login" className="auth-button">Login</Link>
          <Link to="/Signup" className="auth-button signup-button">Signup</Link></>
        )}
      </div>
    </header>
  );
};

export default Header;
