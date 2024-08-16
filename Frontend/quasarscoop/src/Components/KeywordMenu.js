import React from 'react';
import '../Components/html and css/Menu.css';

const KeywordsMenu = ({ onKeywordClick }) => {
  const keywords = ['sun', 'nebula', 'CSS', 'Node.js', 'MongoDB', 'sun', 'nebula', 'CSS', 'Node.js', 'MongoDB', 'sun', 'nebula', 'CSS', 'Node.js', 'MongoDB'];

  return (
    <div className="menu-container keywords-menu">
      <h3>Keywords</h3>
      <ul>
        {keywords.map((keyword, index) => (
          <li key={index} onClick={() => onKeywordClick(keyword)}>
            {keyword}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KeywordsMenu;
