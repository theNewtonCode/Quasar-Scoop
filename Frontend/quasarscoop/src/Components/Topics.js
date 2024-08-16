import React from 'react';

const Topics = () => {
  const topics = ['Planets', 'Stars', 'Galaxies', 'Telescopes', 'Space Missions'];

  return (
    <div className="topics">
      <h2>Explore by Topic</h2>
      <ul>
        {topics.map((topic, index) => (
          <li key={index}>{topic}</li>
        ))}
      </ul>
    </div>
  );
};

export default Topics;
