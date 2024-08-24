import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Brand } from './Brand';
import BlogList from '../Pages/BlogList';

const HomePage = () => {
  const location = useLocation();
  
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const keyword = queryParams.get('keyword');
    if (keyword) {
      setSearchTerm(keyword);
    }

    if (location.hash === '#blog-list-section') {
      const blogSection = document.getElementById('blog-list-section');
      if (blogSection) {
        blogSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div>
      <Brand />
      <div id="blog-list-section">
        <BlogList searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default HomePage;
