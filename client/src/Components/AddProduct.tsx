import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { jwtDecode } from 'jwt-decode';


// ProductFetcher Component
const AddProduct: React.FC = () => {
  const [productURL, setProductURL] = useState('');
  const [productData, setProductData] = useState<{ productName: string; productPrice: string } | null>(null);  // To store the response data
  const [error, setError] = useState<string | null>(null);  // To store errors
  const [tokenUserID, setTokenUserID] = useState<string | null>(null); 
  const [priceLimit, setPriceLimit] = useState('');

  interface DecodedToken {
    userId: string;   // or number, depending on how you store it in your DB
    iat: number;      // Issued at timestamp
    exp: number;      // Expiration timestamp
  }
  

  //Retrieve the token, decode and extract the userId
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decoded = jwtDecode<DecodedToken>(storedToken); 
      setTokenUserID(decoded.userId);  // Update state, which triggers a re-render if necessary
    }
  }, []);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Send a POST request to the backend
      const response: AxiosResponse<{ productName: string; productPrice: string }> = await axios.post('http://localhost:5001/addproduct', {
        productURL,
        userId: tokenUserID,
        priceLimit: parseFloat(priceLimit),
      });

      // Handle successful response
      // Set the response data (productName and productPrice) in the state
      setProductData(response.data);
      setError(null);  // Clear error if any
      console.log('Success:', response.data);
    } catch (error) {
      // Handle error
      console.error('Error:', error);
      setError('Failed to fetch product data');
      setProductData(null);  // Clear product data on error
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Product URL:
          <input
            type="text"
            value={productURL}
            onChange={(e) => setProductURL(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Price Limit:
          <input
            type="number"
            value={priceLimit}
            onChange={(e) => setPriceLimit(e.target.value)}
            required
            step="0.01"  // Allows decimal input
            min="0"  // Ensure price limit is non-negative
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
           {/* Display the product data if available */}
           {productData && (
        <div>
          <h3>Product Name: {productData.productName}</h3>
          <p>Price: {productData.productPrice}</p>
        </div>
      )}

      {/* Display error message if any */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AddProduct;
