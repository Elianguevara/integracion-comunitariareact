import React, { createContext, useState, useContext, useEffect } from 'react'
import { setAuthToken } from '../services/authService' // Importa una función para configurar el token en tus servicios HTTP (por ejemplo, Axios)

// Crear un contexto llamado AuthContext para compartir información de autenticación en toda la app
const AuthContext = createContext()

// Este es el componente proveedor que envolverá a la aplicacion o partes específicas de ella
export const AuthProvider = ({ children }) => {
  // Estado local para almacenar el token de autenticación.
  // Inicializa desde localStorage para mantener la sesión tras recargar la página
  const [token, setToken] = useState(localStorage.getItem('token') || null)

  // useEffect para reaccionar cada vez que cambia el token:
  useEffect(() => {
    setAuthToken(token) // Establece el token actual en tus peticiones HTTP (por ejemplo, configura Axios)
    if (token) {
      localStorage.setItem('token', token) // Guarda el token en localStorage para persistir la sesión
    } else {
      localStorage.removeItem('token') // Elimina el token de localStorage si ya no existe (logout)
    }
  }, [token]) // Este efecto se ejecuta siempre que cambia el token

  // Función para iniciar sesión del usuario, actualizando el token
  const loginUser = (newToken) => setToken(newToken)

  // Función para cerrar sesión, eliminando el token
  const logoutUser = () => setToken(null)

  // Proveer estas funciones y el token actual a los componentes hijos mediante Context API
  return (
    <AuthContext.Provider value={{ token, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook personalizado para simplificar el uso del contexto AuthContext en componentes funcionales
export const useAuth = () => useContext(AuthContext)
