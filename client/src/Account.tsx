import React from 'react';
import AccountDetailsTable from './Components/AccountDetailsTable';

const Account: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Account Details</h1>
      <AccountDetailsTable/>
    </div>
  );
};

export default Account;
