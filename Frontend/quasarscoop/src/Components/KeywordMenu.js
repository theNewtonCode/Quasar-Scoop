import React from 'react';
import '../Components/html and css/Menu.css';

const KeywordsMenu = ({ onKeywordClick }) => {
  const keywords = ['All', 'Sun', 'Nebula', 'Star', 'Black Hole', 'Gravity', 'Light'];

  return (
    <div className="menu-container keywords-menu">
      <h3>Keywords</h3>
      <ul>
        {keywords.map((keyword, index) => (
          <li key={index} onClick={() => onKeywordClick(keyword.toUpperCase())}>
            {keyword}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KeywordsMenu;
