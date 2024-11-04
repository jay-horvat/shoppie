import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const SavedProductsTable: React.FC = () => {
    const [tokenUserID, setTokenUserID] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);  
    const [productData, setProductData] = useState<any[]>([]);

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

    //Get user's products
    useEffect(() => {
        const fetchData = async () => {
            if (tokenUserID) {
                console.log(`Making a GET request with toek ${tokenUserID}`)
                try {

                    const response = await axios.get('http://localhost:5001/getProducts', {
                        params: {user: tokenUserID}
                    });
                    console.log("Received a response:", response.data);
                    setProductData(response.data.productRows || []);
                } catch (error) {
                    console.error('Error:', error);
                    setError('Failed to fetch product data');
                }}
        };
        fetchData();
    }, [tokenUserID]);

    return (
        <>
            {tokenUserID ? (
                <>
                <h1>I guess you're logged in</h1>
                {productData.length > 0 ? (
                    <ul>
                        {productData.map((product, index) => (
                            <li key = {index}>
                                Product name: {product.product_name}, 
                                Product price: {product.product_price},
                                Product url: {product.product_url},
                                Product price limit set: {product.product_price_limit},
                            </li>
                        ))}
                    </ul>
                ) : (
                    <h1>No products</h1>
                )}
            </>
            ) : (
                <h1>Not logged in</h1>
            )}
        </>
    );
  };

  export default SavedProductsTable;