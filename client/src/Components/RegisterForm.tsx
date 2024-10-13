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
    <div>
      <h2>Register Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
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
    </div>
  );
};

export default RegisterForm;
