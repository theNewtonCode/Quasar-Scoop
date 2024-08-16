import axios from 'axios';

// Set up base URL (adjust it to match your backend URL)
const API_URL = 'http://localhost:5000/api/blogs';
export const base_url = 'http://localhost:5000/api';

// Set the token in headers
const getAuthHeaders = () => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
    },
  };
};


// Check if the user is authorized
export const isAuthorized = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    // Optionally, decode and check the expiration (requires jwt-decode package)
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp && payload.exp < Date.now() / 1000) {
      localStorage.removeItem('token'); // Remove expired token
      return false;
    }
    return true;
  } catch (error) {
    console.error('Invalid token:', error);
    return false;
  }
};


// Fetch top 10 most liked blogs
export const getTopBlogs = async () => {
  const response = await axios.get(`${API_URL}/`, getAuthHeaders());
  return response.data;
};

// Get a single blog by ID
export const getBlogById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};

// Create a new blog
export const createBlog = async (blogData) => {
  const response = await axios.post(`${API_URL}/create`, blogData, getAuthHeaders());
  return response.data;
};

// Update a blog
export const updateBlog = async (id, updatedBlogData) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedBlogData, getAuthHeaders());
  return response.data;
};

// Delete a blog
export const deleteBlog = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};