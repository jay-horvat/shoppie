import React from 'react';
import SavedProductsTable from './Components/SavedProductsTable';

const SavedProducts: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">These are your products</h1>
      <SavedProductsTable/>
    </div>
  );
};

export default SavedProducts;
