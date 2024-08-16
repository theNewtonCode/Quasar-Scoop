import React from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';

export const SignupHtml = (props) => {
  return (
    <div className='form-outer'>
      <form onSubmit={props.handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={props.handleChange}
          pattern="[A-Za-z][A-Za-z0-9_]{1,15}"
          title="Username must start with a letter and be between 2 and 16 characters long."
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={props.handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={props.handleChange}
          pattern="(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}"
          title="Password must be at least 6 characters long and contain at least one number and one special character."
          required
        />
        <button type="submit">Signup</button>
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
  );
}