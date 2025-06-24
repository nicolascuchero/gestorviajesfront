# 🌍 Gestor de Viajes - Frontend

Una aplicación para la gestión integral de paquetes de viajes, desarrollada como proyecto final para la materia **Programación de Nuevas Tecnologías 2**.

## 👥 Equipo de Desarrollo

- **Nicolas Gabriel Cuchero**
- **Emanuel Ruben Maravankin**
- **Juan Manuel Recchimuzzi**
- **Ivo Gabriel Degange**
- **Ivan Zarate**

## 📋 Descripción del Proyecto

El Gestor de Viajes es una plataforma web que permite a las agencias de viajes gestionar eficientemente sus paquetes turísticos, clientes, reservas y servicios asociados. La aplicación frontend está desarrollada con React y proporciona una interfaz intuitiva y moderna para la administración de todos los aspectos relacionados con la gestión de viajes.

### 🎯 Funcionalidades Principales

- **Gestión de Usuarios**: Sistema de autenticación y perfiles de usuario
- **Dashboard Interactivo**: Panel de control con métricas y resúmenes
- **Gestión de Hoteles**: Búsqueda, filtrado y administración de alojamientos
- **Gestión de Vuelos**: Sistema completo de búsqueda y reserva de vuelos
- **Gestión de Clientes**: Administración de información de clientes
- **Sistema de Reservas**: Proceso completo de reserva de paquetes turísticos

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19.1.0** - Biblioteca principal para la interfaz de usuario
- **React Router DOM 7.6.2** - Navegación y enrutamiento
- **Tailwind CSS 4.1.5** - Framework de estilos utilitarios
- **Axios 1.9.0** - Cliente HTTP para comunicación con la API
- **React Icons 5.5.0** - Biblioteca de iconos
- **Vite 6.3.5** - Herramienta de construcción y desarrollo
- **Supabase** - Backend como servicio para autenticación

## 🚀 Instalación y Configuración

### Prerrequisitos

- **Node.js** (versión 18 o superior)
- **npm** o **yarn**
- **Backend del Gestor de Viajes** ejecutándose en `http://localhost:3000`

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd PNT2-Tp
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   
   Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api
   VITE_SUPABASE_URL=tu_supabase_url
   VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key
   ```

4. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

5. **Abrir la aplicación**
   
   La aplicación estará disponible en `http://localhost:5173`


## 🎨 Características de la Interfaz

- **Diseño Responsivo**: Adaptable a diferentes tamaños de pantalla
- **Tema Moderno**: Interfaz limpia y profesional con Tailwind CSS
- **Navegación Intuitiva**: Sistema de navegación claro y accesible


## 📄 Licencia

Este proyecto es desarrollado con fines académicos para ORT.

