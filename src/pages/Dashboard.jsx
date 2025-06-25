// src/pages/Dashboard.jsx

import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// Usaremos los estilos de notificaciones para los botones extra
import '../styles/Notifications.css'; 

export default function Dashboard() {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <div className="notifications-container"> {/* Usamos el contenedor para mantener el fondo y centrado */}
      <div className="notifications-card" style={{ maxWidth: '450px' }}> {/* Tarjeta un poco más pequeña */}
        
        <h2>Dashboard</h2>
        
        <p style={{ color: '#eee', textAlign: 'center', marginBottom: '30px' }}>
          ¡Bienvenido al dashboard!
        </p>

        {/* Enlaces a las nuevas vistas */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
           <Link to="/notifications" className="login-button" style={{ textDecoration: 'none' }}>
              Ver Notificaciones Pendientes
           </Link>
           <Link to="/notifications/history" className="login-button" style={{ textDecoration: 'none', backgroundColor: '#34495e' }}>
              Historial de Notificaciones
           </Link>
        </div>
        
        <button
          onClick={handleLogout}
          className="login-button"
          style={{ backgroundColor: '#c0392b' }} // Color diferente para logout
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}