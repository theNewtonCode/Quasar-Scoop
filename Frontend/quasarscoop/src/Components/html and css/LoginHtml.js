import React from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';

export default function LoginHtml(props) {
  return (
        <div className='form-outer'>
        <form className='SignForm'  onSubmit={props.handleSubmit}>
    <input className='SignInput' type="email" name="email" placeholder="Email" onChange={props.handleChange} />
    <input className='SignInput' type="password" name="password" placeholder="Password" onChange={props.handleChange} />
    <button className='SignButton' type="submit">Login</button>
    <Link to="/" className="home-link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="home-icon"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75V21h7.5v-5.25h3V21H21V9.75L12 3z" />
          </svg>
          Home
        </Link>
  </form>
    </div>
  )
}