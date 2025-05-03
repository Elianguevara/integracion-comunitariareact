// src/pages/Dashboard.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/Login.css'    // reutiliza estilos

export default function Dashboard() {
  const navigate = useNavigate()
  const { logoutUser } = useAuth()

  const handleLogout = () => {
    logoutUser()           // limpia el token/contexto
    navigate('/login')     // redirige al login
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Dashboard</h2>
        <p style={{ color: '#eee', textAlign: 'center' }}>
          ¡Bienvenido al dashboard!
        </p>
        <button
          onClick={handleLogout}
          className="login-button"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}
