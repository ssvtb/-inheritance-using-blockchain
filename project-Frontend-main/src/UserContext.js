import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const addUser = (userData) => {
    setUser(userData);
    // Save user data to localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const getUser = () => {
    // Get user data from localStorage
    const storedUserData = localStorage.getItem('userData');
    return storedUserData ? JSON.parse(storedUserData) : null;
  };

  return (
    <UserContext.Provider value={{ user, addUser, getUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
