import React from 'react';
import '../Components/html and css/brand.css';
import { useNavigate } from 'react-router-dom';


export const Brand = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/create-blog'); // Navigates to the create route
  };
  return (
    <div className="brand-container">
      <h1 className="brand-heading">Quasar Scoop!</h1>
      <p className="brand-description">
        Your portal to exploring the cosmos.
      </p>
      <button className="brand-button" onClick={handleClick}>NEW BLOG</button>
    </div>
  );
};
