import React from 'react';
import PriceFetcher from './Components/PriceFetcher';
import AddProduct from './Components/AddProduct';

const Products: React.FC = () => {
  return (
    <div>
      <h1>Product Information:</h1>
      <AddProduct/>
    </div>
  );
};

export default Products;
