import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

// Define the structure of the product information
interface ProductInfo {
  productName: string;
  productPrice: string;
  productUrl: string;
}

// ProductFetcher Component
const ProductFetcher: React.FC = () => {
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch product data from the server-side API
    axios.get('http://localhost:5001/api/product')
      .then((response: AxiosResponse<ProductInfo>) => {
        setProductInfo(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching the product data:', error);
        setError('Failed to fetch product dataaaa');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!productInfo) {
    return <div>No product data available.</div>;
  }

  return (
    <div>
      <h1>{productInfo.productName}</h1>
      <p>Price: {productInfo.productPrice}</p>
      <a href={productInfo.productUrl} target="_blank" rel="noopener noreferrer">
        View Product
      </a>
    </div>
  );
};

export default ProductFetcher;
