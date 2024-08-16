import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogById } from '../api';

const BlogData = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const data = await getBlogById(id);
      setBlog(data);
    };
    fetchBlog();
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>
      <small>Topic: {blog.topic}</small>
      <br />
      <small>By: {blog.author.username}</small>
      <br />
      <small>{blog.likes.length} Likes</small>
      <br />
      <small>{blog.comments.length} Comments</small>
      <h2>Comments</h2>
      {blog.comments.map(comment => (
        <div key={comment._id}>
          <p><strong>{comment.author.username}:</strong> {comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogData;
