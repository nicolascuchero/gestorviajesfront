import React from 'react';
import SearchForm from '../../../components/molecules/SearchForm';
import FilterPanel from '../../../components/molecules/FilterPanel';
import VueloCard from '../../../components/molecules/VueloCard';
import Loading from '../../../components/atoms/Loading';
import Button from '../../../components/atoms/Button';
import Card from '../../../components/atoms/Card';

const VuelosPresentation = ({
  // Estado
  vuelos,
  loading,
  error,
  mostrarFiltros,
  vueloSeleccionado,
  parametrosBusqueda,
  estadisticas,
  
  // Acciones
  onBuscarVuelos,
  onFiltrosChange,
  onSeleccionarVuelo,
  onToggleFavorito,
  onLimpiarBusqueda,
  onNuevaBusqueda,
  
  // Utilidades
  esFavorito
}) => {
  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-20 mb-8">
          <p className="text-gray-600">
            Encuentra los mejores vuelos para tu próximo viaje
          </p>
        </div>

        <Card className="mb-6">
          <SearchForm
            onSearch={onBuscarVuelos}
            loading={loading}
            initialValues={parametrosBusqueda}
          />
        </Card>

        {/* Resultados */}
        {parametrosBusqueda && (
          <div className="space-y-6">
            {/* Header de resultados */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Resultados de búsqueda
                </h2>
                {estadisticas && (
                  <p className="text-sm text-gray-600">
                    {estadisticas.total} vuelos encontrados
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

            {/* Layout principal */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Filtros */}
              {mostrarFiltros && (
                <div className="lg:col-span-1">
                  <FilterPanel
                    onFilterChange={onFiltrosChange}
                    className="sticky top-6"
                  />
                </div>
              )}

              {/* Lista de vuelos */}
              <div className={`${mostrarFiltros ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
                {loading && (
                  <div className="flex justify-center py-12">
                    <Loading size="lg" text="Buscando vuelos..." />
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

                {!loading && !error && vuelos.length === 0 && parametrosBusqueda && (
                  <Card className="text-center py-8">
                    <div className="text-gray-500 mb-4">
                      <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <p className="text-lg font-medium">No se encontraron vuelos</p>
                      <p className="text-sm">Intenta modificar tus criterios de búsqueda</p>
                    </div>
                    <Button onClick={onNuevaBusqueda}>
                      Nueva búsqueda
                    </Button>
                  </Card>
                )}

                {!loading && !error && vuelos.length > 0 && (
                  <div className="space-y-4">
                    {/* Estadísticas rápidas */}
                    {estadisticas && (
                      <Card padding="sm" className="bg-blue-50 border-blue-200">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                          <div>
                            <p className="text-2xl font-bold text-blue-600">{estadisticas.total}</p>
                            <p className="text-xs text-blue-800">Vuelos</p>
                          </div>
                          {estadisticas.precioMin && (
                            <>
                              <div>
                                <p className="text-2xl font-bold text-green-600">${estadisticas.precioMin}</p>
                                <p className="text-xs text-green-800">Más barato</p>
                              </div>
                              <div>
                                <p className="text-2xl font-bold text-orange-600">${estadisticas.precioPromedio}</p>
                                <p className="text-xs text-orange-800">Promedio</p>
                              </div>
                              <div>
                                <p className="text-2xl font-bold text-red-600">${estadisticas.precioMax}</p>
                                <p className="text-xs text-red-800">Más caro</p>
                              </div>
                            </>
                          )}
                        </div>
                      </Card>
                    )}

                    {/* Lista de vuelos */}
                    {vuelos.map((vuelo, index) => (
                      <VueloCard
                        key={vuelo.id || index}
                        vuelo={vuelo}
                        onSelect={onSeleccionarVuelo}
                        onFavorite={onToggleFavorito}
                        isFavorite={esFavorito(vuelo)}
                        showActions={true}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Estado inicial - sin búsqueda */}
        {!parametrosBusqueda && !loading && (
          <Card className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                ¡Comienza tu búsqueda!
              </h3>
              <p className="text-gray-600">
                Completa el formulario de arriba para encontrar los mejores vuelos
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VuelosPresentation;