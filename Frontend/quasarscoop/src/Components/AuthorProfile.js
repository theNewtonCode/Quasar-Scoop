import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getUserProfile, getBlogsByAuthor, deleteBlog } from '../api';
import { FaTrash } from 'react-icons/fa';
import edit from '../assets/edit.svg';
import '../Components/html and css/AuthorProfile.css';

const AuthorProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [showSpringPopup, setShowSpringPopup] = useState(false); // New state for spring popup
  const loggedInUsername = localStorage.getItem('username');
  const navigate = useNavigate();

  const handleEdit = () => {
    // Remove token and update authentication state
    navigate('/edit-profile');
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserProfile(username);
        setUser(userData);
        if (userData && userData._id) {
          const userPosts = await getBlogsByAuthor(userData._id);
          setPosts(userPosts);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate('/login');
        } else {
          console.error('Failed to fetch user profile:', error);
        }
        setError(error.message);
      }
    };

    fetchUserData();
  }, [username]);

  const confirmDelete = (postId) => {
    setPostToDelete(postId);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteBlog(postToDelete);
      setPosts(posts.filter(post => post._id !== postToDelete));
      setShowModal(false);
      setPostToDelete(null);

      // Show spring popup
      setShowSpringPopup(true);

      setTimeout(() => {
        setShowSpringPopup(false); // Hide spring popup after 2 seconds
      }, 2000);

    } catch (error) {
      console.error('Failed to delete post:', error);
      setError('Failed to delete post');
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setPostToDelete(null);
  };

  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <>
      <div className="profile-container">
        <h1 id='h1-author-profile'>{user.username}{loggedInUsername === user.username && (
                  <button onClick={handleEdit} className='edit-button'>
                    <img src={edit} alt="edit" className="edit-img" />edit</button>
                )}</h1>
        <p>Email: {user.email}</p>
        <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>

        <h2 id='h2-author-profile'>Posts by {user.username}</h2>
        <div className="posts">
          <ul className="posts-list">
            {posts.map((post) => (
              <li key={post._id} className="post-item">
                <div className="post-content">
                  <h3>{post.title}</h3>
                  <p>{post.content.substring(0, 100)}...</p>
                  <p><strong>Topic:</strong> {post.topic}</p>
                  <p><strong>Date:</strong> {new Date(post.createdAt).toLocaleDateString()}</p>
                  <p><strong>Visit <Link to={`/blogs/${post._id}`}>Post↗</Link></strong></p>
                </div>
                {loggedInUsername === user.username && (
                  <button className="delete-button" onClick={() => confirmDelete(post._id)}>
                    <FaTrash className="icon" />
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Are you sure you want to delete this post?</h3>
            <div className="modal-buttons">
              <button className="modal-button" onClick={handleDelete}>Yes</button>
              <button className="modal-button" onClick={handleCancel}>No</button>
            </div>
          </div>
        </div>
      )}
      {showSpringPopup && <div className="spring-popup"></div>}
    </>
  );
};

export default AuthorProfile;
