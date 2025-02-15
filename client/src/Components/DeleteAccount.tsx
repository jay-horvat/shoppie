import React, { useState, useEffect, } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const DeleteAccount: React.FC = () => {
    const [tokenUserID, setTokenUserID] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);  

    interface DecodedToken {
        userId: string;   
        iat: number;      
        exp: number;      
      }
     
    const navigate = useNavigate(); 

    //Retrieve the token, decode and extract the userId
    useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decoded = jwtDecode<DecodedToken>(storedToken); 
      setTokenUserID(decoded.userId);  
    }
    }, []);

    const deleteAccount = async (event: React.FormEvent) => {
        event.preventDefault();
        
        if (tokenUserID) {
            console.log(`Making Attempting to delete account of ${tokenUserID}`)
            try {
                await axios.post('http://localhost:5001/deleteUser', {
                user: tokenUserID
                });
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.dispatchEvent(new Event('userUpdated'));
                navigate('/');
                console.log('deleted succesfully!');
            } catch (error) {
                console.error('Error:', error);
                setError('Failed to fetch product data');
            }}
        };

    return (
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={deleteAccount} className="space-y-4">
          <button className="w-full py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300" type="submit">Delete Account</button>
        </form>
  
      </div>
    );
  };

  export default DeleteAccount;