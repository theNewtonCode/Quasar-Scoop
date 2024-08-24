import React, { useEffect, useState } from 'react';
import { getTopBlogs } from '../api';
import { Link } from 'react-router-dom';
import KeywordsMenu from '../Components/KeywordMenu';
import TopicsMenu from '../Components/TopicsMenu';
import '../Components/html and css/BlogList.css';
import { FaHeart, FaComment } from 'react-icons/fa';

const BlogList = ({ searchTerm }) => {
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

  useEffect(() => {
    let filtered = blogs;

    if (selectedKeyword && selectedKeyword !== 'ALL') {
      filtered = filtered.filter((blog) =>
        blog.keywords.includes(selectedKeyword)
      );
    }

    if (selectedTopic && selectedTopic !== 'All') {
      filtered = filtered.filter((blog) => blog.topic === selectedTopic);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBlogs(filtered);
  }, [selectedKeyword, selectedTopic, searchTerm, blogs]);

  const handleKeywordClick = (keyword) => {
    setSelectedKeyword(keyword);
    setSelectedTopic(''); // Clear topic filter when a keyword is selected
  };

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
    setSelectedKeyword(''); // Clear keyword filter when a topic is selected
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
