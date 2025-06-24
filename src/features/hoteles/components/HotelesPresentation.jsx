import React, { useState } from 'react';
import Card from '../../../components/atoms/Card';
import Button from '../../../components/atoms/Button';
import Input from '../../../components/atoms/Input';
import Loading from '../../../components/atoms/Loading';
import HotelCard from '../../../components/molecules/HotelCard';

const HotelesPresentation = ({
  // Estado
  hoteles,
  ubicaciones,
  loading,
  error,
  mostrarFiltros,
  hotelSeleccionado,
  criteriosBusqueda,
  estadisticas,
  
  // Acciones
  onBuscarHoteles,
  onFiltrosChange,
  onSeleccionarHotel,
  onLimpiarBusqueda,
  onNuevaBusqueda,
  onBuscarPorUbicacion
}) => {
  const [filtrosLocales, setFiltrosLocales] = useState({
    ubicacion: '',
    precioMin: '',
    precioMax: '',
    estrellas: '',
    nombre: '',
    ordenarPor: 'precio'
  });

  const handleBuscar = (e) => {
    e.preventDefault();
    onBuscarHoteles(filtrosLocales);
  };

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    const nuevosFiltros = {
      ...filtrosLocales,
      [name]: value
    };
    setFiltrosLocales(nuevosFiltros);
    
    // Aplicar filtros en tiempo real si ya hay resultados
    if (criteriosBusqueda) {
      onFiltrosChange(nuevosFiltros);
    }
  };

  const limpiarFiltros = () => {
    const filtrosVacios = {
      ubicacion: '',
      precioMin: '',
      precioMax: '',
      estrellas: '',
      nombre: '',
      ordenarPor: 'precio'
    };
    setFiltrosLocales(filtrosVacios);
    onFiltrosChange(filtrosVacios);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Buscar Hoteles
          </h1>
          <p className="text-gray-600">
            Encuentra el alojamiento perfecto para tu estadía
          </p>
        </div>

        {/* Formulario de búsqueda */}
        <Card className="mb-6">
          <form onSubmit={handleBuscar} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Ubicación */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ubicación
                </label>
                <select
                  name="ubicacion"
                  value={filtrosLocales.ubicacion}
                  onChange={handleFiltroChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Todas las ubicaciones</option>
                  {ubicaciones.map((ubicacion) => (
                    <option key={ubicacion._id} value={ubicacion._id}>
                      {ubicacion.nombre} - {ubicacion.ciudad}, {ubicacion.pais}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rango de precio */}
              <Input
                type="number"
                name="precioMin"
                label="Precio mínimo (USD)"
                placeholder="0"
                value={filtrosLocales.precioMin}
                onChange={handleFiltroChange}
              />

              <Input
                type="number"
                name="precioMax"
                label="Precio máximo (USD)"
                placeholder="1000"
                value={filtrosLocales.precioMax}
                onChange={handleFiltroChange}
              />

              {/* Estrellas */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estrellas mínimas
                </label>
                <select
                  name="estrellas"
                  value={filtrosLocales.estrellas}
                  onChange={handleFiltroChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Cualquier categoría</option>
                  <option value="1">1 estrella o más</option>
                  <option value="2">2 estrellas o más</option>
                  <option value="3">3 estrellas o más</option>
                  <option value="4">4 estrellas o más</option>
                  <option value="5">5 estrellas</option>
                </select>
              </div>

              {/* Nombre del hotel */}
              <Input
                name="nombre"
                label="Nombre del hotel"
                placeholder="Buscar por nombre..."
                value={filtrosLocales.nombre}
                onChange={handleFiltroChange}
              />

              {/* Ordenar por */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ordenar por
                </label>
                <select
                  name="ordenarPor"
                  value={filtrosLocales.ordenarPor}
                  onChange={handleFiltroChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="precio">Precio (menor a mayor)</option>
                  <option value="precio-desc">Precio (mayor a menor)</option>
                  <option value="estrellas">Estrellas (mayor a menor)</option>
                  <option value="nombre">Nombre (A-Z)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Button
                type="submit"
                disabled={loading}
                className="px-8"
              >
                {loading ? 'Buscando...' : 'Buscar Hoteles'}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={limpiarFiltros}
              >
                Limpiar Filtros
              </Button>
            </div>
          </form>
        </Card>

        {/* Ubicaciones populares */}
        {!criteriosBusqueda && ubicaciones.length > 0 && (
          <Card className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Destinos Populares
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {ubicaciones.slice(0, 6).map((ubicacion) => (
                <Button
                  key={ubicacion._id}
                  variant="outline"
                  size="sm"
                  onClick={() => onBuscarPorUbicacion(ubicacion._id)}
                  className="text-xs"
                >
                  {ubicacion.ciudad}
                </Button>
              ))}
            </div>
          </Card>
        )}

        {/* Resultados */}
        {criteriosBusqueda && (
          <div className="space-y-6">
            {/* Header de resultados */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Hoteles Encontrados
                </h2>
                {estadisticas && (
                  <p className="text-sm text-gray-600">
                    {estadisticas.total} hoteles encontrados
                    {estadisticas.precioMin && (
                      <span>
                        {' '}• Desde ${estadisticas.precioMin} hasta ${estadisticas.precioMax}
                      </span>
                    )}
                  </p>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onNuevaBusqueda}
                >
                  Nueva búsqueda
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onLimpiarBusqueda}
                >
                  Limpiar
                </Button>
              </div>
            </div>

            {/* Contenido de resultados */}
            {loading && (
              <div className="flex justify-center py-12">
                <Loading size="lg" text="Buscando hoteles..." />
              </div>
            )}

            {error && (
              <Card className="text-center py-8">
                <div className="text-red-600 mb-4">
                  <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-lg font-medium">{error}</p>
                </div>
                <Button onClick={onNuevaBusqueda}>
                  Intentar nueva búsqueda
                </Button>
              </Card>
            )}

            {!loading && !error && hoteles.length === 0 && (
              <Card className="text-center py-8">
                <div className="text-gray-500 mb-4">
                  <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <p className="text-lg font-medium">No se encontraron hoteles</p>
                  <p className="text-sm">Intenta modificar tus criterios de búsqueda</p>
                </div>
                <Button onClick={onNuevaBusqueda}>
                  Nueva búsqueda
                </Button>
              </Card>
            )}

            {!loading && !error && hoteles.length > 0 && (
              <div className="space-y-4">
                {/* Estadísticas rápidas */}
                {estadisticas && (
                  <Card padding="sm" className="bg-green-50 border-green-200">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-green-600">{estadisticas.total}</p>
                        <p className="text-xs text-green-800">Hoteles</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-blue-600">${estadisticas.precioMin}</p>
                        <p className="text-xs text-blue-800">Más barato</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-orange-600">${estadisticas.precioPromedio}</p>
                        <p className="text-xs text-orange-800">Promedio</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-purple-600">{estadisticas.estrellasPromedio}★</p>
                        <p className="text-xs text-purple-800">Estrellas prom.</p>
                      </div>
                    </div>
                  </Card>
                )}

                {/* Lista de hoteles */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {hoteles.map((hotel) => (
                    <HotelCard
                      key={hotel._id}
                      hotel={hotel}
                      onSelect={onSeleccionarHotel}
                      showActions={true}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Estado inicial - sin búsqueda */}
        {!criteriosBusqueda && !loading && (
          <Card className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                ¡Encuentra tu hotel ideal!
              </h3>
              <p className="text-gray-600">
                Usa los filtros de arriba para buscar hoteles o selecciona un destino popular
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default HotelesPresentation;