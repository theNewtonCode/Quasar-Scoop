import React, { useEffect, useState } from 'react';
import { getTopBlogs } from '../api';
import { Link } from 'react-router-dom';
import KeywordsMenu from './KeywordMenu';
import TopicsMenu from './TopicsMenu';
import '../Components/html and css/BlogList.css';
import { FaHeart, FaComment } from 'react-icons/fa'; // Importing icons from react-icons

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [selectedKeyword, setSelectedKeyword] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await getTopBlogs();
      setBlogs(data);
      setFilteredBlogs(data); // Initially display all blogs
    };
    fetchBlogs();
  }, []);

  const handleKeywordClick = (keyword) => {
    setSelectedKeyword(keyword);
    setSelectedTopic(''); // Clear topic filter when a keyword is selected
    if (keyword === 'ALL') {
      setFilteredBlogs(blogs); // Show all blogs if 'All' is selected
    } else {
      const filtered = blogs.filter((blog) => blog.keywords.includes(keyword));
      setFilteredBlogs(filtered);
    }
  };

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
    setSelectedKeyword(''); // Clear keyword filter when a topic is selected
    if (topic === 'All') {
      setFilteredBlogs(blogs); // Show all blogs if 'All' is selected
    } else {
      const filtered = blogs.filter((blog) => blog.topic === topic);
      setFilteredBlogs(filtered);
    }
  };

  return (
    <div className="blog-list-container">
      <KeywordsMenu onKeywordClick={handleKeywordClick} />
      <div className="blog-list-content">
        {filteredBlogs.length > 0 ? (
          <ul className="blog-list">
            {filteredBlogs.map((blog) => (
              <li key={blog._id} className="blog-item">
                <Link to={`/blogs/${blog._id}`}>
                <h3 style={{ textTransform: 'uppercase' }}>{blog.title}</h3>
                </Link>
                <p>{blog.content.substring(0, 100)}...</p>
                <div className="blog-meta">
                  <small>By: {blog.author.username}</small>
                  <div className="blog-actions">
                    <span className="blog-likes">
                      <FaHeart /> {blog.likes.length}
                    </span>
                    <span className="blog-comments">
                      <FaComment /> {blog.comments.length}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No blogs available for this selection.</p>
        )}
      </div>
      <TopicsMenu onTopicClick={handleTopicClick} />
    </div>
  );
};

export default BlogList;
