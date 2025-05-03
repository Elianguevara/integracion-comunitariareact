import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../services/authService'
import '../styles/Register.css'

export default function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    roleType: 'cliente'
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await register(formData)
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrar')
    }
  }

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Registro</h2>
        <form onSubmit={handleSubmit}>

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

          {/* Aquí ya no usamos .input-group */}
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

          <button type="submit" className="register-button">
            Crear cuenta
          </button>
          {error && <p className="register-error">{error}</p>}
        </form>

        <p className="register-switch">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  )
}
