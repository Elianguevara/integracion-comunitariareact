# 🏘️ Integración Comunitaria - Frontend Web

![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?style=for-the-badge&logo=vite)
![React Router](https://img.shields.io/badge/Router-v7-CA4245?style=for-the-badge&logo=reactrouter)
![Axios](https://img.shields.io/badge/HTTP-Axios-5A29E4?style=for-the-badge&logo=axios)

## 📖 Descripción

Esta es la aplicación web cliente para la plataforma de **Integración Comunitaria**. Desarrollada como una Single Page Application (SPA) moderna, permite a los usuarios gestionar su identidad y mantenerse informados a través de un sistema robusto de notificaciones en tiempo real.

El proyecto está construido utilizando la última tecnología del ecosistema React (**React 19**), priorizando el rendimiento y una experiencia de usuario fluida mediante el uso de **Vite** como empaquetador.

## 🚀 Características Implementadas

### 🔐 Autenticación y Seguridad
* **Gestión de Sesiones:** Manejo de estado global con **Context API** (`AuthContext`).
* **Protección de Rutas:** Sistema de `ProtectedRoute` para restringir el acceso a vistas privadas (Dashboard, Notificaciones) solo a usuarios autenticados.
* **Persistencia:** Gestión segura de tokens JWT en `localStorage`.

### 🔔 Sistema de Notificaciones
* **Bandeja de Entrada:** Visualización de notificaciones pendientes ordenadas cronológicamente.
* **Acciones en Tiempo Real:**
  * Marcar notificaciones como leídas.
  * Eliminación de notificaciones (borrado lógico).
* **Historial:** Vista dedicada para consultar notificaciones pasadas.

### 📱 Interfaz de Usuario
* **Dashboard Central:** Panel de control principal con acceso rápido a las funcionalidades clave.
* **Navegación Fluida:** Enrutamiento optimizado con **React Router v7**.

## 🛠️ Stack Tecnológico

* **Core:** React 19
* **Build Tool:** Vite 6
* **Enrutamiento:** React Router DOM v7
* **Cliente HTTP:** Axios
* **Linter:** ESLint (Configuración moderna v9)
* **Estilos:** CSS3 nativo (Modular y Global)

## ⚙️ Instalación y Ejecución

### Prerrequisitos
* Node.js 18+
* NPM o Yarn
* Backend API corriendo (Notification API)

### 1. Clonar el repositorio
```bash
git clone [https://github.com/elianguevara/integracion-comunitaria-react.git](https://github.com/elianguevara/integracion-comunitaria-react.git)
cd integracion-comunitaria-react
