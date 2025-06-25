import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// --- CAMBIO AQUÍ: ya no importamos 'markAsViewed' ---
import { getNotifications, deleteNotification } from '../services/notificationService';
import '../styles/Notifications.css';

export default function NotificationHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await getNotifications();
        const sortedData = data.sort((a, b) => new Date(b.dateCreate) - new Date(a.dateCreate));
        setHistory(sortedData);
      } catch (err) {
        setError('Error al cargar el historial.');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  // --- CAMBIO AQUÍ: Eliminamos la función 'handleMarkAsViewed' ---

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta notificación?')) {
      try {
        await deleteNotification(id);
        setHistory(prevHistory => prevHistory.filter(n => n.id !== id));
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
        <h2>Historial de Notificaciones</h2>
        {history.length > 0 ? (
          <ul className="notifications-list">
            {history.map(notif => (
              <li key={notif.id} className={`notification-item ${notif.viewed ? 'viewed' : ''}`}>
                <p>{notif.message}</p>
                <small>Recibido: {new Date(notif.dateCreate).toLocaleString()}</small>
                {notif.viewed && <span className="status-badge">Vista</span>}

                {/* --- CAMBIO AQUÍ: Dejamos solo el botón de eliminar --- */}
                <div className="notification-actions">
                  <button onClick={() => handleDelete(notif.id)} className="action-button delete">
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-notifications">No hay notificaciones en tu historial.</p>
        )}
        <div className="notifications-actions">
           <Link to="/notifications" className="action-link">Ver Pendientes</Link>
           <Link to="/dashboard" className="action-link">Volver al Dashboard</Link>
        </div>
      </div>
    </div>
  );
}