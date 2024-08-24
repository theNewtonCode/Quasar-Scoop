import React, { useEffect, useState } from 'react';
import { getAuthorsWithBlogCount } from '../api';
import '../Components/html and css/Authors.css';
import { useNavigate } from 'react-router-dom';

export const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const data = await getAuthorsWithBlogCount();
        setAuthors(data);
      } catch (error) {
        console.error('Failed to fetch authors:', error);
      }
    };

    fetchAuthors();
  }, []);

  const handleAuthorClick = (authorId) => {
    navigate(`/author/${authorId}`);
  };

  return (
    <div className="authors-container">
      <h1 className="authors-title">Astronomy Blog Authors</h1>
      <ul className="authors-list">
        {authors.map((author, index) => (
          <li
            key={index}
            className="author-item"
            onClick={() => handleAuthorClick(author._id)}
          >
            <span className="author-name">{author.author}</span>
            <span className="blog-count">{author.blogCount} blogs</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

