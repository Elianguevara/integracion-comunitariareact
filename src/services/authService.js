import axios from 'axios';

const API = axios.create({
  // Asegúrate que esta URL base apunte a tu backend correctamente
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/auth', // Ajusta si tu base es /auth o no
  headers: { 'Content-Type': 'application/json' }
});

// Para incluir token en cada petición tras login
export function setAuthToken(token) {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
}

// --- CORRECCIÓN AQUÍ ---
// Ahora la función acepta un solo argumento 'userData' (que será tu objeto formData)
export const register = (userData) =>
  // Envía el objeto 'userData' completo al endpoint /auth/register
  API.post('/register', userData);
// --- FIN CORRECCIÓN ---

export const login = (email, password) =>
  API.post('/login', { email, password });

// Añade otras exportaciones si tienes más llamadas API
// export default API; // Podrías exportar API si necesitas usarlo directamente en otro lado