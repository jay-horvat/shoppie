import React from 'react';
import PriceFetcher from './Components/PriceFetcher';
import AddProduct from './Components/AddProduct';

const Products: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Track a new product.</h1>
      <AddProduct/>
    </div>
  );
};

export default Products;
