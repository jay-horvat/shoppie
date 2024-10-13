import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Home from './Home';
import Footer from './Components/Footer';
import Login from './Login';
import Register from './Register';
import Products from './Products';
import './App.css';

const App: React.FC = () => {

  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    // Clear the token from localStorage or cookies
    localStorage.removeItem('token');  // Or use document.cookie if stored in cookies

    // Redirect to home page
    navigate('/');
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><a href="#" onClick={handleLogout}>Logout</a></li>
            </ul>
          </nav>
        </header>
        <main className="App-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
