import React, { useEffect, useState } from 'react';

const ShowUser: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);

  const fetchUser = () => {
    const storedUser = localStorage.getItem('user');
    setUser(storedUser);
  };

  useEffect(() => {
    // Fetch user when component mounts
    fetchUser();

    // Listen for the custom event
    const handleUserUpdate = () => {
      fetchUser();
    };

    window.addEventListener('userUpdated', handleUserUpdate);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('userUpdated', handleUserUpdate);
    };
  }, []);

  return <h3>{user ? `Logged in as: ${user}` : 'No user logged in'}</h3>;
};

export default ShowUser;
