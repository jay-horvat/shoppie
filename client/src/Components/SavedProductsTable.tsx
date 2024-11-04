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
        <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold text-center text-blue-600 mb-6">Saved Products</h1>
            {tokenUserID ? (
                <>
                    {productData.length > 0 ? (
                        <table className="min-w-full border border-gray-200 bg-gray-50 rounded-lg overflow-hidden">
                            <thead className="bg-gray-200 text-gray-700">
                                <tr>
                                    <th className="px-4 py-2 text-left font-semibold">Product Name</th>
                                    <th className="px-4 py-2 text-left font-semibold">Product Price</th>
                                    <th className="px-4 py-2 text-left font-semibold">Product URL</th>
                                    <th className="px-4 py-2 text-left font-semibold">Price Limit Set</th>
                                    <th className="px-4 py-2 text-left font-semibold">Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productData.map((product, index) => (
                                    <tr key={index} className="border-t hover:bg-gray-100">
                                        <td className="px-4 py-2">{product.product_name}</td>
                                        <td className="px-4 py-2">{product.product_price}</td>
                                        <td className="px-4 py-2">
                                            <a href={product.product_url} className="text-blue-500 hover:underline">
                                                {product.product_url}
                                            </a>
                                        </td>
                                        <td className="px-4 py-2">{product.product_price_limit}</td>
                                        <td className="px-4 py-2 text-blue-500 hover:text-blue-700 cursor-pointer">Edit</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-center text-gray-500">No products saved.</p>
                    )}
                </>
            ) : (
                <p className="text-center text-red-500">Please log in to view saved products.</p>
            )}

            {/* Error message */}
            {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        </div>
    );
  };

  export default SavedProductsTable;