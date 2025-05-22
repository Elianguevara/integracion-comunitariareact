// src/pages/Login.jsx

import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom' // Hooks para navegar entre rutas y enlaces internos
import { login } from '../services/authService'       // Servicio que maneja la solicitud HTTP para autenticar
import { useAuth } from '../context/AuthContext'      // Hook personalizado para manejar el contexto de autenticación
import '../styles/Login.css'                          // Estilos específicos para la vista de Login

// Componente funcional que maneja el inicio de sesión de usuarios
export default function Login() {
  // Estados locales para almacenar email, contraseña y errores
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Hook para redireccionar al usuario después de iniciar sesión
  const navigate = useNavigate()

  // Función que actualiza el token de usuario en el contexto AuthContext
  const { loginUser } = useAuth()

  // Función que maneja el envío del formulario de inicio de sesión
  const handleSubmit = async e => {
    e.preventDefault()  // Previene que la página se recargue al enviar el formulario

    try {
      // Llama al servicio que hace la petición HTTP para autenticar al usuario
      const { data } = await login(email, password)

      // Guarda el token de sesión en el contexto
      loginUser(data.token)

      // Redirecciona al usuario al dashboard tras una autenticación exitosa
      navigate('/dashboard')

    } catch (err) {
      // Si ocurre un error, muestra un mensaje de error claro al usuario
      setError(err.response?.data?.message || 'Credenciales inválidas')
    }
  }

  // Renderiza la interfaz del formulario de inicio de sesión
  return (
    <div className="login-container"> {/* Contenedor principal con estilos compartidos */}
      <div className="login-card">    {/* Tarjeta central del login */}

        {/* Encabezado con título y lema */}
        <div className="login-header">
          <h1 className="login-title">Integración Comunitaria</h1>
          <p className="login-slogan">Unidos crecemos</p>
        </div>

        <h2>Inicio de Sesión</h2>

        {/* Formulario para iniciar sesión */}
        <form onSubmit={handleSubmit}>
          
          {/* Campo para ingresar el email */}
          <div className="input-group">
            <label>Ingresa tu email</label>
            <input
              type="email"
              placeholder="Enter email address here"
              value={email}
              onChange={e => setEmail(e.target.value)} // Actualiza el estado del email
              required
            />
          </div>

          {/* Campo para ingresar la contraseña */}
          <div className="input-group">
            <label>Ingresa tu contraseña</label>
            <input
              type="password"
              placeholder="Enter password here"
              value={password}
              onChange={e => setPassword(e.target.value)} // Actualiza el estado de la contraseña
              required
            />
          </div>

          {/* Botón para enviar el formulario y realizar el login */}
          <button type="submit" className="login-button">
            Enviar
          </button>

          {/* Muestra el mensaje de error solo si existe uno */}
          {error && <p className="error">{error}</p>}

        </form>

        {/* Enlace para que usuarios nuevos puedan registrarse */}
        <p className="switch-link">
          ¿No tenes cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  )
}
