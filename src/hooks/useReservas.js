import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../features/auth/authClient';

const API_BASE_URL = 'http://localhost:3000/api'; // Ajustar según configuración del backend

const useReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [reservaActual, setReservaActual] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [usuario, setUsuario] = useState(null);

  // Obtener usuario actual
  useEffect(() => {
    const obtenerUsuario = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUsuario(user);
    };
    obtenerUsuario();
  }, []);

  // Cargar reservas del usuario
  const cargarReservas = useCallback(async () => {
    if (!usuario) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Primero intentamos obtener las reservas del backend
      const response = await fetch(`${API_BASE_URL}/reservas?clienteId=${usuario.id}`);
      
      if (response.ok) {
        const data = await response.json();
        setReservas(data);
      } else {
        // Si no hay backend de reservas, usar localStorage como fallback
        const reservasLocal = localStorage.getItem(`reservas-${usuario.id}`);
        if (reservasLocal) {
          setReservas(JSON.parse(reservasLocal));
        } else {
          setReservas([]);
        }
      }
    } catch (err) {
      console.error('Error al cargar reservas:', err);
      // Fallback a localStorage
      const reservasLocal = localStorage.getItem(`reservas-${usuario.id}`);
      if (reservasLocal) {
        setReservas(JSON.parse(reservasLocal));
      } else {
        setReservas([]);
      }
    } finally {
      setLoading(false);
    }
  }, [usuario]);

  // Cargar reservas cuando el usuario cambie
  useEffect(() => {
    if (usuario) {
      cargarReservas();
    }
  }, [usuario, cargarReservas]);

  // Crear nueva reserva
  const crearReserva = useCallback(async (datosReserva) => {
    if (!usuario) {
      setError('Debe estar autenticado para crear una reserva');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const nuevaReserva = {
        id: Date.now().toString(),
        clienteId: usuario.id,
        clienteEmail: usuario.email,
        fechaCreacion: new Date().toISOString(),
        estado: 'pendiente',
        ...datosReserva
      };

      // Intentar guardar en el backend
      try {
        const response = await fetch(`${API_BASE_URL}/reservas`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuevaReserva)
        });

        if (response.ok) {
          const reservaCreada = await response.json();
          setReservas(prev => [...prev, reservaCreada]);
          setReservaActual(reservaCreada);
          return reservaCreada;
        }
      } catch (backendError) {
        console.warn('Backend no disponible, guardando localmente:', backendError);
      }

      // Fallback: guardar en localStorage
      const reservasActuales = [...reservas, nuevaReserva];
      setReservas(reservasActuales);
      localStorage.setItem(`reservas-${usuario.id}`, JSON.stringify(reservasActuales));
      setReservaActual(nuevaReserva);
      
      return nuevaReserva;
    } catch (err) {
      console.error('Error al crear reserva:', err);
      setError('Error al crear la reserva. Por favor, intenta nuevamente.');
      return null;
    } finally {
      setLoading(false);
    }
  }, [usuario, reservas]);

  // Actualizar reserva
  const actualizarReserva = useCallback(async (id, datosActualizados) => {
    if (!usuario) return null;

    setLoading(true);
    setError(null);

    try {
      // Intentar actualizar en el backend
      try {
        const response = await fetch(`${API_BASE_URL}/reservas/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(datosActualizados)
        });

        if (response.ok) {
          const reservaActualizada = await response.json();
          setReservas(prev => prev.map(r => r.id === id ? reservaActualizada : r));
          return reservaActualizada;
        }
      } catch (backendError) {
        console.warn('Backend no disponible, actualizando localmente:', backendError);
      }

      // Fallback: actualizar en localStorage
      const reservasActualizadas = reservas.map(reserva =>
        reserva.id === id ? { ...reserva, ...datosActualizados } : reserva
      );
      setReservas(reservasActualizadas);
      localStorage.setItem(`reservas-${usuario.id}`, JSON.stringify(reservasActualizadas));
      
      const reservaActualizada = reservasActualizadas.find(r => r.id === id);
      return reservaActualizada;
    } catch (err) {
      console.error('Error al actualizar reserva:', err);
      setError('Error al actualizar la reserva.');
      return null;
    } finally {
      setLoading(false);
    }
  }, [usuario, reservas]);

  // Cancelar reserva
  const cancelarReserva = useCallback(async (id) => {
    return await actualizarReserva(id, { 
      estado: 'cancelada',
      fechaCancelacion: new Date().toISOString()
    });
  }, [actualizarReserva]);

  // Confirmar reserva
  const confirmarReserva = useCallback(async (id) => {
    return await actualizarReserva(id, { 
      estado: 'confirmada',
      fechaConfirmacion: new Date().toISOString()
    });
  }, [actualizarReserva]);

  // Obtener reserva por ID
  const obtenerReservaPorId = useCallback((id) => {
    return reservas.find(reserva => reserva.id === id);
  }, [reservas]);

  // Filtrar reservas por estado
  const filtrarPorEstado = useCallback((estado) => {
    return reservas.filter(reserva => reserva.estado === estado);
  }, [reservas]);

  // Calcular estadísticas
  const estadisticas = useCallback(() => {
    const total = reservas.length;
    const pendientes = reservas.filter(r => r.estado === 'pendiente').length;
    const confirmadas = reservas.filter(r => r.estado === 'confirmada').length;
    const canceladas = reservas.filter(r => r.estado === 'cancelada').length;
    
    const montoTotal = reservas
      .filter(r => r.estado !== 'cancelada')
      .reduce((sum, reserva) => sum + (reserva.montoTotal || 0), 0);

    return {
      total,
      pendientes,
      confirmadas,
      canceladas,
      montoTotal
    };
  }, [reservas]);

  // Limpiar reserva actual
  const limpiarReservaActual = useCallback(() => {
    setReservaActual(null);
  }, []);

  return {
    // Estado
    reservas,
    reservaActual,
    loading,
    error,
    usuario,
    
    // Acciones
    cargarReservas,
    crearReserva,
    actualizarReserva,
    cancelarReserva,
    confirmarReserva,
    limpiarReservaActual,
    
    // Utilidades
    obtenerReservaPorId,
    filtrarPorEstado,
    estadisticas: estadisticas(),
    
    // Estados específicos
    reservasPendientes: filtrarPorEstado('pendiente'),
    reservasConfirmadas: filtrarPorEstado('confirmada'),
    reservasCanceladas: filtrarPorEstado('cancelada')
  };
};

export default useReservas;