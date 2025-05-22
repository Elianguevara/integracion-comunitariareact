// src/pages/Dashboard.jsx

import React from 'react'
import { useNavigate } from 'react-router-dom' // Hook para redirigir al usuario entre rutas
import { useAuth } from '../context/AuthContext' // Usa el hook personalizado para acceder al contexto de autenticación
import '../styles/Login.css' // Importa estilos reutilizables (probablemente usados también en la pantalla de Login)

// Componente funcional que representa la vista del Dashboard
export default function Dashboard() {
  
  const navigate = useNavigate() // Obtiene la función para cambiar de ruta
  const { logoutUser } = useAuth() // Extrae la función logout del contexto de autenticación

  // Función que maneja el cierre de sesión del usuario
  const handleLogout = () => {
    logoutUser()            // Llama al contexto para eliminar el token del usuario y cerrar sesión
    navigate('/login')      // Redirige inmediatamente al usuario a la página de login
  }

  // Renderiza la interfaz del Dashboard
  return (
    <div className="login-container"> {/* Reutiliza estilos del contenedor para mantener coherencia visual */}
      <div className="login-card"> {/* Usa una tarjeta para un diseño limpio y centrado */}
        
        <h2>Dashboard</h2> {/* Título principal del dashboard */}
        
        <p style={{ color: '#eee', textAlign: 'center' }}>
          ¡Bienvenido al dashboard! {/* Mensaje de bienvenida */}
        </p>
        
        <button
          onClick={handleLogout} // Botón que ejecuta la función de cierre de sesión
          className="login-button" // Reutiliza estilo del botón para consistencia con la interfaz de login
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}
