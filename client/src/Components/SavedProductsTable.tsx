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
                    <table>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Product Price</th>
                                <th>Product URL</th>
                                <th>Price Limit Set</th>
                                <th>edit</th>
                            </tr>
                        </thead>
                        <tbody>
                        {productData.map((product, index) => (
                            <tr key = {index}>
                                <td>{product.product_name}</td> 
                                <td>{product.product_price}</td>
                                <td>{product.product_url}</td>
                                <td>{product.product_price_limit}</td>
                                <td>EDIT</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
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