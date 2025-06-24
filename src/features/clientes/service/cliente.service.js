import { get, post, put, del } from '../../../services/apiClient';

/**
 * Obtener todos los clientes
 * @returns {Promise<Array>} Lista de clientes
 */
export const obtenerClientes = async () => {
  return await get('/clientes');
};

/**
 * Obtener un cliente por ID
 * @param {string} id - ID del cliente
 * @returns {Promise<Object>} Datos del cliente
 */
export const obtenerClientePorId = async (id) => {
  return await get(`/clientes/${id}`);
};

/**
 * Crear un nuevo cliente
 * @param {Object} cliente - Datos del nuevo cliente
 * @returns {Promise<Object>} Cliente creado
 */
export const crearCliente = async (cliente) => {
  return await post('/clientes', cliente);
};

/**
 * Actualizar un cliente existente
 * @param {string} id - ID del cliente a actualizar
 * @param {Object} datosActualizados - Datos actualizados del cliente
 * @returns {Promise<Object>} Cliente actualizado
 */
export const actualizarCliente = async (id, datosActualizados) => {
  return await put(`/clientes/${id}`, datosActualizados);
};

/**
 * Eliminar un cliente
 * @param {string} id - ID del cliente a eliminar
 * @returns {Promise<Object>} Resultado de la operación
 */
export const eliminarCliente = async (id) => {
  return await del(`/clientes/${id}`);
};