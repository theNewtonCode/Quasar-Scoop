import React from 'react';
import '../Components/html and css/brand.css';
import { useNavigate } from 'react-router-dom';


export const Brand = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    const rocketIcon = document.querySelector('.rocket-icon');
    rocketIcon.classList.add('fly-away');  // Start flying away

    // Wait for the animation to complete before navigating
    setTimeout(() => {
      navigate('/create-blog');
    }, 500); // Adjust time based on the duration of the animation
  };

  return (
    <div className="brand-container">
      <h1 className="brand-heading">Quasar Scoop!</h1>
      <p className="brand-description">
        Your portal to exploring the cosmos.
      </p>
      <button className="brand-button" onClick={handleClick}>
  <div className="rocket-icon"></div>
</button>
    </div>
  );
};
