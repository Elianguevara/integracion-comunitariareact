import React, { createContext, useState, useContext, useEffect } from 'react'
import { setAuthToken } from '../services/authService'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null)

  useEffect(() => {
    setAuthToken(token)
    if (token) localStorage.setItem('token', token)
    else localStorage.removeItem('token')
  }, [token])

  const loginUser = (newToken) => setToken(newToken)
  const logoutUser = () => setToken(null)

  return (
    <AuthContext.Provider value={{ token, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
