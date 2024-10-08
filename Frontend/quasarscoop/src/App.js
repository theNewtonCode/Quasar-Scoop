import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import CreateBlog from './Pages/CreateBlog';
import BlogData from './Pages/BlogData';
import AuthorProfile from './Pages/AuthorProfile';
import Header from './Pages/Header';
import Home from './Pages/Home';
import { Authors } from './Pages/Authors';
// import searchBlogs from './Components/searchBlogs'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if there's a token in localStorage
    const token = localStorage.getItem('token');
    
    
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true); 
  };

  const handleLogout = () => {
    // Remove token and update authentication state
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
  };


  return (
    <Router>
      <div className="App">
        <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} username={localStorage.getItem('username')} />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Authors" element={<Authors />} />
          <Route path="/blogs/:id" element={<BlogData />} />
          <Route path="/search" element={<searchBlogs />} />
          <Route path="/login" element={<Login onLogin={handleLogin}/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/author/:username" element={<AuthorProfile />} />
        </Routes>
        <h5 class="footer-text">
  &copy; 2024 theNewtonCode. All rights reserved.
</h5>
      </div>
    </Router>
  );
}

export default App;
