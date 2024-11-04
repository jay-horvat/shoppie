import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Welcome to the Home Page</h1>
      <p className="text-lg text-gray-700 max-w-md text-center">
        This is your starting point. Discover our products, explore services, or get in touch with us. 
        We’re excited to have you here!
      </p>
      <button className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-300">
        Get Started
      </button>
    </div>
  );
};

export default Home;
