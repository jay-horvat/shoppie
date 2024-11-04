import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { jwtDecode } from 'jwt-decode';


// AddProduct Component
const AddProduct: React.FC = () => {
  const [productURL, setProductURL] = useState('');
  const [productData, setProductData] = useState<{ productName: string; productPrice: string } | null>(null);  
  const [error, setError] = useState<string | null>(null);  
  const [tokenUserID, setTokenUserID] = useState<string | null>(null); 
  const [priceLimit, setPriceLimit] = useState('');

  interface DecodedToken {
    userId: string;   
    iat: number;      
    exp: number;      
  }
  

  //Retrieve the token, decode and extract the userId
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decoded = jwtDecode<DecodedToken>(storedToken); 
      setTokenUserID(decoded.userId);  
    }
  }, []);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Send a POST request to the backend
      const response: AxiosResponse<{ productName: string; productPrice: string; message: string }> = await axios.post('http://localhost:5001/addproduct', {
        productURL,
        userId: tokenUserID,
        priceLimit: parseFloat(priceLimit),
      });

      // Handle successful response
      // Set the response data (productName and productPrice) in the state
      setProductData(response.data);
      setError(response.data.message); 
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch product data');
      setProductData(null); 
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">Add Product</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700">
            Product URL:
            <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              type="text"
              value={productURL}
              onChange={(e) => setProductURL(e.target.value)}
              required
            />
          </label>
        </div>
        <br />
        <div>
          <label className="block text-gray-700">
            Price Limit:
            <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              type="number"
              value={priceLimit}
              onChange={(e) => setPriceLimit(e.target.value)}
              required
              step="0.01"  
              min="0"  
            />
          </label>
        </div>
        <br />
        <button className="w-full py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300" type="submit">Submit</button>
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
