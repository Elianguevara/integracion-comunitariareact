// src/pages/Register.jsx
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../services/authService'
import '../styles/Login.css'    // Reutiliza estilos del login

export default function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    roleType: 'cliente',
    customer: {
      name: '',
      dateYear: '',
      dni: '',
      phone: '',
      address: '',
      gpsLat: '',
      gpsLon: ''
    },
    provider: {
      name: '',
      address: '',
      gpsLat: '',
      gpsLong: '',
      typeProviderId: '',
      gradeProviderId: '',
      professionId: '',
      offerId: '',
      categoryId: ''
    }
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith('customer.')) {
      const key = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        customer: { ...prev.customer, [key]: value }
      }))
    } else if (name.startsWith('provider.')) {
      const key = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        provider: { ...prev.provider, [key]: value }
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Construir payload según el roleType
      const payload = {
        name: formData.name,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        roleType: formData.roleType
      }
      if (formData.roleType === 'cliente' || formData.roleType === 'ambos') {
        payload.customer = formData.customer
      }
      if (formData.roleType === 'proveedor' || formData.roleType === 'ambos') {
        payload.provider = formData.provider
      }
      await register(payload)
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrar')
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Registro</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nombre</label>
            <input
              type="text"
              placeholder="Ingresa tu nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Apellido</label>
            <input
              type="text"
              placeholder="Ingresa tu apellido"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Usuario</label>
            <input
              type="text"
              placeholder="Nombre de usuario"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Ingresa tu email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Tipo de rol</label>
            <select
              name="roleType"
              value={formData.roleType}
              onChange={handleChange}
            >
              <option value="cliente">Cliente</option>
              <option value="proveedor">Proveedor</option>
              <option value="ambos">Ambos</option>
            </select>
          </div>

          {/* Campos de cliente */}
          {(formData.roleType === 'cliente' || formData.roleType === 'ambos') && (
            <>
              <h4 style={{ color: '#1abc9c', marginBottom: '10px' }}>Datos del Cliente</h4>
              <div className="input-group">
                <label>Nombre Cliente</label>
                <input type="text" name="customer.name" placeholder="Ej: María González" value={formData.customer.name} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Fecha de Nacimiento</label>
                <input type="date" name="customer.dateYear" value={formData.customer.dateYear} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>DNI</label>
                <input type="text" name="customer.dni" value={formData.customer.dni} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Teléfono</label>
                <input type="text" name="customer.phone" value={formData.customer.phone} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Dirección</label>
                <input type="text" name="customer.address" value={formData.customer.address} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Latitud</label>
                <input type="number" step="any" name="customer.gpsLat" value={formData.customer.gpsLat} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Longitud</label>
                <input type="number" step="any" name="customer.gpsLon" value={formData.customer.gpsLon} onChange={handleChange} required />
              </div>
            </>
          )}

          {/* Campos de proveedor */}
          {(formData.roleType === 'proveedor' || formData.roleType === 'ambos') && (
            <>
              <h4 style={{ color: '#1abc9c', marginBottom: '10px' }}>Datos del Proveedor</h4>
              <div className="input-group">
                <label>Nombre Proveedor</label>
                <input type="text" name="provider.name" value={formData.provider.name} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Dirección</label>
                <input type="text" name="provider.address" value={formData.provider.address} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Latitud</label>
                <input type="number" step="any" name="provider.gpsLat" value={formData.provider.gpsLat} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Longitud</label>
                <input type="number" step="any" name="provider.gpsLong" value={formData.provider.gpsLong} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Tipo de Proveedor ID</label>
                <input type="number" name="provider.typeProviderId" value={formData.provider.typeProviderId} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Grado Proveedor ID</label>
                <input type="number" name="provider.gradeProviderId" value={formData.provider.gradeProviderId} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Profesión ID</label>
                <input type="number" name="provider.professionId" value={formData.provider.professionId} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Oferta ID</label>
                <input type="number" name="provider.offerId" value={formData.provider.offerId} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Categoria ID</label>
                <input type="number" name="provider.categoryId" value={formData.provider.categoryId} onChange={handleChange} required />
              </div>
            </>
          )}

          <button type="submit" className="login-button">
            Crear cuenta
          </button>
          {error && <p className="error">{error}</p>}
        </form>

        <p className="switch-link">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  )
}
