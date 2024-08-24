import React, { useState, useEffect } from 'react';
import { base_url } from '../api';
import { Link, useNavigate } from 'react-router-dom';
import '../Components/html and css/Header.css';

import logo from '../assets/logo.svg'; // Import your logo
import profileIcon from '../assets/profile-icon.png';

const Header = ({ isAuthenticated, onLogout, username }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();
  
  

  const Logout = () => {
    // Remove token and update authentication state
    onLogout();
    navigate('/login');
  };

  useEffect(() => {
    const number_of_stars = 100;

    const random_number = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const createStars = () => {
      const headerElement = document.querySelector('.header');
      for (let i = 0; i < number_of_stars; i++) {
        const star = document.createElement('div');
        const star_rotation = i % 2 === 0 ? 'move_right' : 'move_left';
        const star_top = random_number(0, headerElement.clientHeight);
        const star_left = random_number(0, headerElement.clientWidth);
        const star_radius = random_number(1, 3);
        const star_duration = random_number(6, 16);

        star.classList.add('star');
        star.style.top = `${star_top}px`;
        star.style.left = `${star_left}px`;
        star.style.width = `${star_radius}px`;
        star.style.height = `${star_radius}px`;
        star.style.animationName = star_rotation;
        star.style.animationDuration = `${star_duration}s`;

        headerElement.appendChild(star);
      }
    };

    createStars();

    return () => {
      // Clean up stars on component unmount
      document.querySelectorAll('.header .star').forEach(star => star.remove());
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      navigate(`/?keyword=${encodeURIComponent(searchKeyword)}#blog-list-section`);
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
      <Link to="/create-blog" className="nav-item">Create a Blog</Link>
        <Link to="/Authors" className="nav-item">All Authors</Link>
        <Link to="/contact" className="nav-item">Contact</Link>

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
        {isAuthenticated ? (
          <><img src={profileIcon} alt="" className='profile-icon-image'/>
            <Link to={`/author/${localStorage.getItem('userId')}`} className="nav-item">{username}</Link>
            <button onClick={Logout} className="auth-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="auth-button">Login</Link>
            <Link to="/signup" className="auth-button signup-button">Signup</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
