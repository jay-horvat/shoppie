import React, { useEffect, useState } from 'react';

const ShowUser: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);

  // Get the user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    setUser(storedUser);
  }, []);  // Empty dependency array means this runs once only when component called i think?

  // Render the user if its there, otherwise display a fallback message
  return <h3>{user ? `Logged in as: ${user}` : 'No user logged in'}</h3>;
};

export default ShowUser;
