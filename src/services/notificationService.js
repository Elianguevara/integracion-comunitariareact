import axios from 'axios';

// Usamos la variable de entorno corregida (ej: http://localhost:8080)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

// Función auxiliar que obtiene el token del localStorage y prepara los encabezados
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

/**
 * Lista las notificaciones del usuario.
 */
export const getNotifications = (params = {}) => {
  return axios.get(`${API_BASE_URL}/api/notifications`, {
    headers: getAuthHeaders(),
    params: params
  });
};

/**
 * Obtiene el historial de una notificación específica por su ID.
 */
export const getNotificationHistory = (id) => {
  return axios.get(`${API_BASE_URL}/api/notifications/${id}/history`, {
    headers: getAuthHeaders()
  });
};

// --- NUEVAS FUNCIONES ---

/**
 * Marca una notificación como leída.
 * @param {number} id - El ID de la notificación.
 */
export const markAsViewed = (id) => {
  return axios.patch(`${API_BASE_URL}/api/notifications/${id}/view`, {}, {
    headers: getAuthHeaders()
  });
};

/**
 * Elimina (borrado lógico) una notificación.
 * @param {number} id - El ID de la notificación.
 */
export const deleteNotification = (id) => {
  return axios.delete(`${API_BASE_URL}/api/notifications/${id}`, {
    headers: getAuthHeaders()
  });
};