import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthorized, createBlog } from '../api';
import '../Components/html and css/CreateBlog.css'; // Link the new CSS file for styling
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; 

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [notification, setNotification] = useState(''); // State for notification
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isAuthorized()) {
        const newBlog = {
          title,
          content,
          topic,
          keywords: keywords.split(',').map((keyword) => keyword.trim()), // Convert keywords into an array
        };

        await createBlog(newBlog);
        setNotification('Blog created successfully!'); // Set success notification

        // Redirect to the homepage after a delay
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      setNotification('Failed to create blog. Please try again.'); // Set failure notification
    }
  };

  return (
    <div className="create-blog-container">
      <h2 className="title">Create a New Blog</h2>
      <form onSubmit={handleSubmit} className="blog-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Topic</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Keywords (comma-separated)</label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g. planets, space exploration"
            required
          />
        </div>
        <button type="submit" className="submit-button">Create Blog</button>
      </form>
      {notification && <p className="notification">{notification}</p>} {/* Display notification */}
    </div>
  );
};

export default CreateBlog;
