import axios from 'axios';

// La URL base ahora viene sin /auth desde .env
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

// Creamos la instancia y le añadimos /auth
const API = axios.create({
  baseURL: `${API_BASE_URL}/auth`,
  headers: { 'Content-Type': 'application/json' }
});

export function setAuthToken(token) {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
}

// Las rutas relativas '/register' y '/login' ahora funcionan perfectamente
export const register = (userData) =>
  API.post('/register', userData);

export const login = (email, password) =>
  API.post('/login', { email, password });