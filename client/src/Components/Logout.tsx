import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('userUpdated'));
        navigate('/');
    }

    return (
        <div 
          className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </div>
      );
  };

  export default Logout;