import React, { createContext, useState, useEffect } from 'react';

// Create Auth Context
export const AuthContext = createContext();

// Auth Context Provider Component
export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem('role'));

  // Effect to listen for changes in local storage
  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem('role'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Function to handle login
  const login = (userRole) => {
    localStorage.setItem('role', userRole);
    setRole(userRole);
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
