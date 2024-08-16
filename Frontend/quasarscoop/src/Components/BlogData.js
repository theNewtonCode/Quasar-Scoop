import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogById } from '../api';
import '../Components/html and css/BlogData.css'; // Import the CSS file for styling

const BlogData = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [newComment, setNewComment] = useState('');
  
  useEffect(() => {
    const fetchBlog = async () => {
      const data = await getBlogById(id);
      setBlog(data);
    };
    fetchBlog();
  }, [id]);

  const handleCommentChange = (e) => setNewComment(e.target.value);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    // Add logic to submit the new comment
    console.log("New comment submitted:", newComment);
    // Clear the comment input
    setNewComment('');
  };

  if (!blog) return <div className="loading">Loading...</div>;

  return (
    <div className="blog-container">
      <div className="blog-content">
        <h1 className="blog-title">{blog.title}</h1>
        <p className="blog-text">{blog.content}</p>
        <div className="blog-meta">
          <small className="blog-topic">Topic: {blog.topic}</small>
          <small className="blog-author">
            By: <Link to={`/author/${blog.author._id}`} className="author-link">{blog.author.username}</Link>
          </small>
          <div className="blog-actions">
            <button className="like-button">Like {blog.likes.length}</button>
          </div>
        </div>
        <div className="comments-section">
          <h2 className="comments-title">Comments</h2>
          {blog.comments.map(comment => (
            <div key={comment._id} className="comment">
              <p className="comment-text"><strong>{comment.author.username}:</strong> {comment.content}</p>
            </div>
          ))}
          <form className="comment-form" onSubmit={handleCommentSubmit}>
            <textarea
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Add a comment..."
              rows="4"
              required
            />
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogData;
