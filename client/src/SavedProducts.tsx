import React from 'react';
import SavedProductsTable from './Components/SavedProductsTable';

const SavedProducts: React.FC = () => {
  return (
    <div>
      <h1>These are your products</h1>
      <SavedProductsTable/>
    </div>
  );
};

export default SavedProducts;
