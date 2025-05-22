// src/pages/Register.jsx

import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom' // Hooks para navegación interna
import { register } from '../services/authService'    // Servicio que realiza petición para registrar usuarios
import '../styles/Register.css'                       // Estilos específicos para la página de registro

// Componente funcional para la página de registro de usuarios
export default function Register() {
  const navigate = useNavigate() // Hook para redireccionar tras registro exitoso

  // Estado local inicial para almacenar los datos del formulario de registro
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    roleType: 'cliente' // valor por defecto del rol del usuario
  })

  // Estado local para manejar mensajes de error en la interfaz
  const [error, setError] = useState('')

  // Función que maneja el cambio de valores en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value })) // Actualiza el campo específico del formulario dinámicamente
  }

  // Función asíncrona para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault() // Evita recargar la página al enviar el formulario

    try {
      // Envía los datos del formulario al servidor para registrar al usuario
      await register(formData)

      // Si es exitoso, redirecciona inmediatamente al usuario a la página de login
      navigate('/login')

    } catch (err) {
      // Captura errores y muestra un mensaje claro al usuario
      setError(err.response?.data?.message || 'Error al registrar')
    }
  }

  // Renderiza la interfaz del formulario de registro
  return (
    <div className="register-container"> {/* Contenedor principal del formulario */}
      <div className="register-card">    {/* Tarjeta central que envuelve al formulario */}
        
        <h2>Registro</h2>

        <form onSubmit={handleSubmit}>
          
          {/* Campo para nombre */}
          <div className="input-group">
            <label>Nombre</label>
            <input
              type="text"
              name="name"
              placeholder="Ingresa tu nombre"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Campo para apellido */}
          <div className="input-group">
            <label>Apellido</label>
            <input
              type="text"
              name="lastName"
              placeholder="Ingresa tu apellido"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Campo para email */}
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Ingresa tu email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Campo para contraseña */}
          <div className="input-group">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="Ingresa tu contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Grupo especial para seleccionar tipo de rol mediante radios */}
          <div className="radio-input-group">
            <span className="radio-group-label">Tipo de rol</span>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="roleType"
                  value="cliente"
                  checked={formData.roleType === 'cliente'}
                  onChange={handleChange}
                />
                Cliente
              </label>
              <label>
                <input
                  type="radio"
                  name="roleType"
                  value="proveedor"
                  checked={formData.roleType === 'proveedor'}
                  onChange={handleChange}
                />
                Proveedor
              </label>
              <label>
                <input
                  type="radio"
                  name="roleType"
                  value="ambos"
                  checked={formData.roleType === 'ambos'}
                  onChange={handleChange}
                />
                Ambos
              </label>
            </div>
          </div>

          {/* Botón para enviar el formulario */}
          <button type="submit" className="register-button">
            Crear cuenta
          </button>

          {/* Mensaje de error visible solo cuando ocurra algún problema */}
          {error && <p className="register-error">{error}</p>}

        </form>

        {/* Enlace para volver al inicio de sesión si ya tiene una cuenta */}
        <p className="register-switch">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  )
}
