import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchBlogs } from '../api'; // Ensure you have this function in your API file
import BlogList from './BlogList'; // Reuse your BlogList component

const SearchResults = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const keyword = query.get('keyword');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await searchBlogs(keyword);
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [keyword]);

  return (
    <div className="search-results-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <BlogList blogs={blogs} /> // Pass the blogs to the BlogList component
      )}
    </div>
  );
};

export default SearchResults;
