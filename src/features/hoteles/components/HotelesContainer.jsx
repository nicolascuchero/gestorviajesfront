import React, { useState, useEffect } from 'react';
import useHoteles from '../../../hooks/useHoteles';
import HotelesPresentation from './HotelesPresentation';

const HotelesContainer = () => {
  const {
    hoteles,
    ubicaciones,
    loading,
    error,
    buscarHoteles,
    aplicarFiltros,
    cargarUbicaciones,
    estadisticas,
    limpiarResultados
  } = useHoteles();

  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [hotelSeleccionado, setHotelSeleccionado] = useState(null);
  const [criteriosBusqueda, setCriteriosBusqueda] = useState(null);

  // Cargar ubicaciones al montar el componente
  useEffect(() => {
    cargarUbicaciones();
  }, [cargarUbicaciones]);

  // Manejar búsqueda de hoteles
  const handleBuscarHoteles = async (criterios) => {
    setCriteriosBusqueda(criterios);
    await buscarHoteles(criterios);
    setMostrarFiltros(true);
  };

  // Manejar cambio de filtros
  const handleFiltrosChange = (filtros) => {
    aplicarFiltros(filtros);
  };

  // Manejar selección de hotel
  const handleSeleccionarHotel = (hotel) => {
    setHotelSeleccionado(hotel);
    console.log('Hotel seleccionado:', hotel);
  };

  // Limpiar búsqueda
  const handleLimpiarBusqueda = () => {
    limpiarResultados();
    setMostrarFiltros(false);
    setHotelSeleccionado(null);
    setCriteriosBusqueda(null);
  };

  // Nueva búsqueda
  const handleNuevaBusqueda = () => {
    handleLimpiarBusqueda();
  };

  // Buscar por ubicación específica
  const handleBuscarPorUbicacion = async (ubicacionId) => {
    const criterios = { ubicacion: ubicacionId };
    await handleBuscarHoteles(criterios);
  };

  return (
    <HotelesPresentation
      // Estado
      hoteles={hoteles}
      ubicaciones={ubicaciones}
      loading={loading}
      error={error}
      mostrarFiltros={mostrarFiltros}
      hotelSeleccionado={hotelSeleccionado}
      criteriosBusqueda={criteriosBusqueda}
      estadisticas={estadisticas}
      
      // Acciones
      onBuscarHoteles={handleBuscarHoteles}
      onFiltrosChange={handleFiltrosChange}
      onSeleccionarHotel={handleSeleccionarHotel}
      onLimpiarBusqueda={handleLimpiarBusqueda}
      onNuevaBusqueda={handleNuevaBusqueda}
      onBuscarPorUbicacion={handleBuscarPorUbicacion}
    />
  );
};

export default HotelesContainer;