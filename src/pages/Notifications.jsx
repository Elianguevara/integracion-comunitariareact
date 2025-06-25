import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getNotifications, markAsViewed, deleteNotification } from '../services/notificationService';
import '../styles/Notifications.css';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchNotifications = async () => {
    try {
      const { data } = await getNotifications({ viewed: false });
      // --- CAMBIO AQUÍ: Ordenamos las notificaciones ---
      const sortedData = data.sort((a, b) => new Date(b.dateCreate) - new Date(a.dateCreate));
      setNotifications(sortedData);
    } catch (err) {
      setError('Error al cargar las notificaciones.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);
  
  const handleMarkAsViewed = async (id) => {
    try {
      await markAsViewed(id);
      setNotifications(prevNotifications => prevNotifications.filter(n => n.id !== id));
    } catch (err) {
      alert('Error al marcar como leída.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta notificación?')) {
      try {
        await deleteNotification(id);
        setNotifications(prevNotifications => prevNotifications.filter(n => n.id !== id));
      } catch (err) {
        alert('Error al eliminar la notificación.');
      }
    }
  };

  if (loading) return <div className="loading-message">Cargando...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="notifications-container">
      <div className="notifications-card">
        <h2>Notificaciones Pendientes</h2>
        {notifications.length > 0 ? (
          <ul className="notifications-list">
            {notifications.map(notif => (
              <li key={notif.id} className="notification-item">
                <p>{notif.message}</p>
                <small>Recibido: {new Date(notif.dateCreate).toLocaleString()}</small>
                <div className="notification-actions">
                  <button onClick={() => handleMarkAsViewed(notif.id)} className="action-button view">
                    Marcar como leída
                  </button>
                  <button onClick={() => handleDelete(notif.id)} className="action-button delete">
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-notifications">No tienes notificaciones nuevas.</p>
        )}
        <div className="notifications-actions">
          <Link to="/dashboard" className="action-link">Volver al Dashboard</Link>
          <Link to="/notifications/history" className="action-link">Ver Historial</Link>
        </div>
      </div>
    </div>
  );
}