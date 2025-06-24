import React, { useState, useEffect } from 'react';
import useReservas from '../../../hooks/useReservas';
import useVuelos from '../../../hooks/useVuelos';
import DashboardPresentation from './DashboardPresentation';

const DashboardContainer = () => {
  const {
    reservas,
    estadisticas: estadisticasReservas,
    loading: loadingReservas,
    cargarReservas
  } = useReservas();

  const {
    favoritos
  } = useVuelos();

  const [datosUsuario, setDatosUsuario] = useState(null);

  // Cargar datos al montar el componente
  useEffect(() => {
    cargarReservas();
  }, [cargarReservas]);

  // Obtener reservas recientes (últimas 5)
  const reservasRecientes = reservas
    .sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion))
    .slice(0, 5);

  // Obtener vuelos favoritos recientes (últimos 5)
  const favoritosRecientes = favoritos
    .sort((a, b) => new Date(b.fechaAgregado) - new Date(a.fechaAgregado))
    .slice(0, 5);

  // Calcular estadísticas del dashboard
  const estadisticasDashboard = {
    totalReservas: reservas.length,
    reservasPendientes: reservas.filter(r => r.estado === 'pendiente').length,
    reservasConfirmadas: reservas.filter(r => r.estado === 'confirmada').length,
    totalFavoritos: favoritos.length,
    montoTotalGastado: estadisticasReservas?.montoTotal || 0,
    proximoViaje: reservas
      .filter(r => r.estado === 'confirmada' && r.fechaViaje && new Date(r.fechaViaje) > new Date())
      .sort((a, b) => new Date(a.fechaViaje) - new Date(b.fechaViaje))[0]
  };

  // Datos para gráficos (simulados)
  const datosGraficos = {
    reservasPorMes: [
      { mes: 'Ene', reservas: 2 },
      { mes: 'Feb', reservas: 1 },
      { mes: 'Mar', reservas: 3 },
      { mes: 'Abr', reservas: 0 },
      { mes: 'May', reservas: 1 },
      { mes: 'Jun', reservas: 2 }
    ],
    destinosPopulares: [
      { destino: 'Miami', viajes: 3 },
      { destino: 'Madrid', viajes: 2 },
      { destino: 'París', viajes: 1 },
      { destino: 'Roma', viajes: 1 }
    ]
  };

  return (
    <DashboardPresentation
      // Estado
      reservasRecientes={reservasRecientes}
      favoritosRecientes={favoritosRecientes}
      estadisticas={estadisticasDashboard}
      datosGraficos={datosGraficos}
      loading={loadingReservas}
      
      // Datos del usuario
      datosUsuario={datosUsuario}
    />
  );
};

export default DashboardContainer;