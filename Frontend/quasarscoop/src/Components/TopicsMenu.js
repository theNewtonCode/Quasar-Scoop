import React from 'react';
import '../Components/html and css/Menu.css';

const TopicsMenu = ({ onTopicClick }) => {
  const topics = ['All','sun', 'nebula', 'Programming', 'Web Development', 'Science'];

  return (
    <div className="menu-container topics-menu">
      <h3>Topics</h3>
      <ul>
        {topics.map((topic, index) => (
          <li key={index} onClick={() => onTopicClick(topic)}>
            {topic}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopicsMenu;
