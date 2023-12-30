import React, { createContext, useState, useEffect } from 'react';

// Create a Context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // Load the user data from localStorage when the app starts
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
