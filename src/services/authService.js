// authService.js

import axios from 'axios';

// Crea una instancia personalizada de axios
const API = axios.create({
  // URL base del backend para las solicitudes HTTP
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/auth',
  headers: { 'Content-Type': 'application/json' } // Especifica que enviamos y recibimos JSON
});

// Función que permite configurar o eliminar automáticamente el token JWT 
// en cada solicitud HTTP después del login/logout
export function setAuthToken(token) {
  if (token) {
    // Si existe un token, lo establece en el encabezado de autorización
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // Si no existe token (logout), elimina el encabezado de autorización
    delete API.defaults.headers.common['Authorization'];
  }
}

// Función que realiza la petición HTTP al backend para registrar un nuevo usuario
// Recibe un solo parámetro userData (objeto con datos del usuario: name, lastName, email, password, roleType)
export const register = (userData) =>
  API.post('/register', userData);

// Función que realiza la petición HTTP al backend para iniciar sesión
// Recibe email y password directamente
export const login = (email, password) =>
  API.post('/login', { email, password });

// Puedes exportar directamente API si necesitas usarla para otros endpoints en el futuro
// export default API;
