import React, { useState } from 'react';
import axios from 'axios';
import { SignupHtml } from '../Components/html and css/SignupHtml';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', formData);
      alert(res.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (<>
<div>
  <h1 className='SignHeading'>SIGNUP HERE</h1>
</div>
<SignupHtml handleChange={handleChange} handleSubmit={handleSubmit}/>
</>
  );
};

export default Signup;