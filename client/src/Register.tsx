import React from 'react';
import RegisterForm from './Components/RegisterForm';

const Register: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Register for an account.</h1>
      <RegisterForm/>
    </div>
  );
};

export default Register;
