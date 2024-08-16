import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './Pages/Header';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import UserPage from './Pages/UserPage';
import Home from './Components/Home';
import CreateBlog from './Components/CreateBlog';
import BlogData from './Components/BlogData';
import BlogList from './Components/BlogList';
import AuthorProfile from './Components/AuthorProfile';

function App() {
  return (
    <Router>
      <div className="App">
        <Home />
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/blogs/:id" element={<BlogData />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/author/:username" element={<AuthorProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
