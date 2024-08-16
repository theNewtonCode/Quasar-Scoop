import React, { useEffect, useState } from 'react';
import { getTopBlogs } from '../api';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await getTopBlogs();
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  return (
    <div>
      <h2>Top Blogs</h2>
      {blogs.length > 0 ? (
        <ul>
          {blogs.map((blog) => (
            <li key={blog._id}>
              <Link to={`/blogs/${blog._id}`}>
                <h3>{blog.title}</h3>
              </Link>
              <p>{blog.content.substring(0, 100)}...</p>
              <small>By: {blog.author.username}</small>
              <br />
              <small>{blog.likes.length} Likes</small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No blogs available.</p>
      )}
    </div>
  );
};

export default BlogList;
