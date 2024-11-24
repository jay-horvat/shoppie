import React, { useState } from 'react';
import axios from 'axios';

const LoginForm: React.FC = () => {
  // State variables for form fields
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Send a POST request to the backend
      const response = await axios.post('http://localhost:5001/login', {
        name,
        password
      });

      // Handle successful response
      console.log('Success:', response.data);
      //Displaye whatever message the route produced
      setMessage(response.data.message);
      //Store the JWT toekn produced
      localStorage.setItem('token', response.data.token);
      //set User
      localStorage.setItem('user', response.data.username);
      
      window.dispatchEvent(new Event('userUpdated'));

    } catch (error) {
      // Handle error
      console.error('Error:', error);
      setMessage('Login failed hmmmmmm');
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">Login Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">
            Username:
            <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <br />
        <div>
          <label className="block text-gray-700">
            Password:
            <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <br />
        <button className="w-full py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300" type="submit">Submit</button>
      </form>

      {/* Display login message */}
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}

    </div>
  );
};

export default LoginForm;
