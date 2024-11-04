import React, { useState } from 'react';
import axios from 'axios';


const RegisterForm: React.FC = () => {
  // State variables for form fields
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Send a POST request to the backend
      const response = await axios.post('http://localhost:5001/createUser', {
        name,
        password,
        email
      });

      // Handle successful response
      console.log('Success:', response.data);
    } catch (error) {
      // Handle error
      console.error('Error:', error);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">Register Form</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700">
            Email:
            <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <br />
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
    </div>
  );
};

export default RegisterForm;
