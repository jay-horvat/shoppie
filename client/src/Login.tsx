// Login.tsx
import React from 'react';
import LoginForm from './Components/LoginForm';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Log in to your account.</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
