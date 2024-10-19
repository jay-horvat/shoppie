import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import Footer from './Components/Footer';
import Login from './Login';
import Register from './Register';
import Products from './Products';
import Logout from './Components/Logout';
import ShowUser from './Components/ShowUser';
import SavedProducts from './SavedProducts';
import './App.css';

const App: React.FC = () => {
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
              <li><Link to="/savedproducts">Saved Products</Link></li>
              <li><Logout /></li>
              <li><ShowUser /></li>
            </ul>
          </nav>
        </header>
        <main className="App-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products />} />
            <Route path="/savedproducts" element={<SavedProducts />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
