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
import logo from './assets/images/ShoppieLogov1.png';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <header>
          <nav  className="bg-gradient-to-r from-indigo-900 via-purple-900 to-purple-700 shadow-lg"
          >
            <ul className="flex text-white">
              <div>
                <li>
                  <Link to="/">
                    <img src={logo} alt="Logo" className="w-16 h-16" />
                  </Link>
                </li>
              </div>
              <div className="flex text-white items-center px-4 py-2 mx-auto space-x-6">
                <li><Link to="/" className="text-lg font-semibold hover:text-gray-200 transition duration-200">Home</Link></li>
                <li><Link to="/login" className="text-lg font-semibold hover:text-gray-200 transition duration-200">Login</Link></li>
                <li><Link to="/register" className="text-lg font-semibold hover:text-gray-200 transition duration-200">Register</Link></li>
                <li><Link to="/products" className="text-lg font-semibold hover:text-gray-200 transition duration-200">Products</Link></li>
                <li><Link to="/savedproducts" className="text-lg font-semibold hover:text-gray-200 transition duration-200">Saved Products</Link></li>
                {/* Account Dropdown */}
                <li className="relative group">
                  <button className="text-lg font-semibold hover:text-gray-200 transition duration-200">
                    Account
                  </button>
                  <ul className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible transition-opacity duration-200">
                    <li>
                      <Logout />
                    </li>
                    <li className="block px-4 py-2">
                      <ShowUser />
                    </li>
                  </ul>
                </li>
              </div>
            </ul>
          </nav>
        </header>
        <main className="flex bg-violet-50 justify-center">
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
