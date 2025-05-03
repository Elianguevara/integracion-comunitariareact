import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/auth',
  headers: { 'Content-Type': 'application/json' }
})

// Para incluir token en cada petición tras login
export function setAuthToken(token) {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete API.defaults.headers.common['Authorization']
  }
}

export const register = (name, email, password) =>
  API.post('/register', { name, email, password })

export const login = (email, password) =>
  API.post('/login', { email, password })
