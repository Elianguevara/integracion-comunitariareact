// src/App.jsx
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Notifications from './pages/Notifications'; 
import NotificationHistory from './pages/NotificationHistory'; 
import { useAuth } from './context/AuthContext';

function App() {
  const { token } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rutas Protegidas */}
      <Route
        path="/dashboard"
        element={token ? <Dashboard /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/notifications"
        element={token ? <Notifications /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/notifications/history"
        element={token ? <NotificationHistory /> : <Navigate to="/login" replace />}
      />

      {/* Redirección por defecto */}
      <Route
        path="*"
        element={<Navigate to={token ? '/dashboard' : '/login'} replace />}
      />
    </Routes>
  );
}

export default App;