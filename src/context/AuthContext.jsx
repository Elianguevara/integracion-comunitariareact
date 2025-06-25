// src/context/AuthContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';
// Asegúrate de que importa la función desde './services/api'
import { setAuthToken } from '../services/api'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    setAuthToken(token); 
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const loginUser = (newToken) => setToken(newToken);
  const logoutUser = () => setToken(null);

  return (
    <AuthContext.Provider value={{ token, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);