import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    }

    return <button onClick = {handleLogout}>Logout</button>;
  };

  export default Logout;