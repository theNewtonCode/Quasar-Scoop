import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginHtml from '../Components/html and css/LoginHtml';


const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const navigate = useNavigate();

  useEffect(() => {
    // Check if a token exists in localStorage
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      navigate(`/user/${userId}`);
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', formData);
      const { token, result } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('username', result.username);
      localStorage.setItem('userId', result._id);
      onLogin(); // Notify parent component of successful login
      navigate(`/`);
      alert('Login successful');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (<>
    <div>
  <h1 className='SignHeading' >LOGIN</h1>
</div>
<LoginHtml handleChange={handleChange} handleSubmit={handleSubmit} />
</>
  );
};

export default Login;