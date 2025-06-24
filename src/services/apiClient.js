import axios from 'axios';
//import { API_BASE_URL } from '../config/api';

//const apiClient = axios.create({
  //baseURL: API_BASE_URL,
  //headers: {
   // 'Content-Type': 'application/json',
  //},
//});

//export default apiClient;
//export const apiRequest = async (endpoint, method = 'GET', body = null, requiresAuth = true) => {
  /*const headers = {
    'Content-Type': 'application/json',
  };
  
  // Agregar token de autenticación si es necesario
  if (requiresAuth) {
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error en la solicitud');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en apiClient:', error);
    throw error;
  }
};*/

// Métodos específicos para simplificar llamadas
export const get = (endpoint, requiresAuth = true) => apiRequest(endpoint, 'GET', null, requiresAuth);
export const post = (endpoint, body, requiresAuth = true) => apiRequest(endpoint, 'POST', body, requiresAuth);
export const put = (endpoint, body, requiresAuth = true) => apiRequest(endpoint, 'PUT', body, requiresAuth);
export const del = (endpoint, requiresAuth = true) => apiRequest(endpoint, 'DELETE', null, requiresAuth);
