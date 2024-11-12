import React from 'react';
import { Link } from 'react-router-dom';
import logo from './assets/images/ShoppieLogov1.png';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {/* Logo and Business Name */}
      <div className="flex flex-col items-center mb-10">
        {/* Logo Image */}
        <img src={logo} alt="Logo" className="w-72 h-72 mb-4 object-contain" />
      </div>

      {/* Welcome Section */}
      <h1 className="text-3xl font-bold text-violet-600 mb-4">Start tracking your favourite products today!</h1>
      <p className="text-lg text-gray-700 max-w-md text-center">
        Shoppie allows you to track products from your favourite stores and be notified when they go on sale!
      </p>
      <Link to='/register'>
        <button className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-300">
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default Home;
