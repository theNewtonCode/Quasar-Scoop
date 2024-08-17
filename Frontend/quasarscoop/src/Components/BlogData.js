import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogById, base_url } from '../api';
import '../Components/html and css/BlogData.css'; // Import the CSS file for styling

const BlogData = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [showSpringPopup, setShowSpringPopup] = useState(false); // New state for spring popup
  
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
    try {
      const response = await fetch(`${base_url}/blogs/comment/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token for protected routes
        },
        body: JSON.stringify({ content: newComment }),
      });

      if (response.ok) {
        const newCommentData = await response.json();
        setBlog((prevBlog) => ({
          ...prevBlog,
          comments: [...prevBlog.comments, newCommentData],
        }));
        setNewComment(''); // Clear the comment input after submission
      } else {
        console.error('Failed to add comment');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleLike = async () => {
    try {
      const response = await fetch(`${base_url}/blogs/${id}/like`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        
      });
      if (response.ok) {
        const updatedData = await response.json();
        // Update the likes count based on the length of the returned array
        setBlog((prevBlog) => ({
          ...prevBlog,
          likes: updatedData.likes,
        }));}
        setShowSpringPopup(true);

      setTimeout(() => {
        setShowSpringPopup(false); // Hide spring popup after 2 seconds
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!blog) return <div className="loading">Loading...</div>;

  return (
    <>
    <div className="blog-container">
      <div className="blog-content">
        <h1 className="blog-title">{blog.title}</h1>
        <div className="blog-meta-2">
        <small className="blog-topic">Topic: {blog.topic}</small>
          <small className="blog-author">
            Author: <Link to={`/author/${blog.author._id}`} className="author-link">{blog.author.username}↗</Link>
          </small>
          </div>
        <p className="blog-text">{blog.content}</p>
        
          <div className="blog-actions">
            <button className="like-button" onClick={handleLike}>Like {blog.likes.length}</button>
          
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
    {showSpringPopup && <div className="spring-popup-like"></div>}
    </>
  );
};

export default BlogData;
