// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    // Get token from local storage or initialize it to null
    const token = localStorage.getItem('token');
    return { token };
  });

  const signIn = (token) => {
    setAuthData({ token });
    localStorage.setItem('token', token);
  };

  const signOut = () => {
    setAuthData({ token: null });
    localStorage.removeItem('token');
  };

  useEffect(() => {
    // Optional: Check authentication status on initial load
  }, []);

  return (
    <AuthContext.Provider value={{ authData, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
