// src/pages/Login.jsx
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../services/authService'
import { useAuth } from '../context/AuthContext'
import '../styles/Login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { loginUser } = useAuth()

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const { data } = await login(email, password)
      loginUser(data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Credenciales inválidas')
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">

        {/* Cabecera con nombre de la app y lema */}
        <div className="login-header">
          <h1 className="login-title">Integración Comunitaria</h1>
          <p className="login-slogan">Unidos crecemos</p>
        </div>

        <h2>Inicio de Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Ingresa tu email</label>
            <input
              type="email"
              placeholder="Enter email address here"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Ingresa tu contraseña</label>
            <input
              type="password"
              placeholder="Enter password here"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Enviar
          </button>

          {error && <p className="error">{error}</p>}
        </form>
        <p className="switch-link">
          ¿No tenes cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  )
}
