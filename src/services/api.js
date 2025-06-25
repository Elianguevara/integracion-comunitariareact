// src/services/api.js
import axios from 'axios';

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

// Instancia para las rutas de autenticación (públicas)
// FIJATE que la baseURL termina en '/auth'
export const authApi = axios.create({
  baseURL: `${VITE_API_BASE_URL}/auth` 
});

// Instancia para las rutas protegidas por JWT
// FIJATE que la baseURL termina en '/api'
export const privateApi = axios.create({
  baseURL: `${VITE_API_BASE_URL}/api`
});

// Función central para configurar el token en la instancia privada
export const setAuthToken = (token) => {
  if (token) {
    privateApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete privateApi.defaults.headers.common['Authorization'];
  }
};