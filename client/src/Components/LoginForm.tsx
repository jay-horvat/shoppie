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

    } catch (error) {
      // Handle error
      console.error('Error:', error);
      setMessage('Login failed hmmmmmm');
    }
  };

  return (
    <div>
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>

      {/* Display login message */}
      {message && <p>{message}</p>}

    </div>
  );
};

export default LoginForm;
