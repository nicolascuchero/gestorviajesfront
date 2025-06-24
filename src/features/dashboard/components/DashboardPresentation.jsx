import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../../components/atoms/Card';
import Button from '../../../components/atoms/Button';
import Loading from '../../../components/atoms/Loading';
import VueloCard from '../../../components/molecules/VueloCard';

const DashboardPresentation = ({
  reservasRecientes,
  favoritosRecientes,
  estadisticas,
  datosGraficos,
  loading,
  datosUsuario
}) => {
  const formatPrice = (price) => {
    if (!price) return '$0';
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loading size="lg" text="Cargando dashboard..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mi Dashboard
          </h1>
          <p className="text-gray-600">
            Resumen de tus viajes y actividad reciente
          </p>
        </div>

        {/* Estadísticas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-blue-100 text-sm">Total Reservas</p>
                <p className="text-3xl font-bold">{estadisticas.totalReservas}</p>
              </div>
              <div className="text-blue-200">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-green-100 text-sm">Confirmadas</p>
                <p className="text-3xl font-bold">{estadisticas.reservasConfirmadas}</p>
              </div>
              <div className="text-green-200">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-yellow-100 text-sm">Pendientes</p>
                <p className="text-3xl font-bold">{estadisticas.reservasPendientes}</p>
              </div>
              <div className="text-yellow-200">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-purple-100 text-sm">Total Gastado</p>
                <p className="text-3xl font-bold">{formatPrice(estadisticas.montoTotalGastado)}</p>
              </div>
              <div className="text-purple-200">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </Card>
        </div>

        {/* Próximo viaje */}
        {estadisticas.proximoViaje && (
          <Card className="mb-8 bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-indigo-900 mb-2">
                  🎉 Próximo Viaje
                </h3>
                <p className="text-indigo-700">
                  <span className="font-medium">{estadisticas.proximoViaje.destino}</span>
                  {' • '}
                  <span>{formatDate(estadisticas.proximoViaje.fechaViaje)}</span>
                </p>
              </div>
              <Button variant="primary" size="sm">
                Ver Detalles
              </Button>
            </div>
          </Card>
        )}

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reservas recientes */}
          <div className="lg:col-span-2">
            <Card>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Reservas Recientes
                </h3>
                <Link to="/reservas">
                  <Button variant="outline" size="sm">
                    Ver todas
                  </Button>
                </Link>
              </div>

              {reservasRecientes.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p>No tienes reservas aún</p>
                  <Link to="/vuelos">
                    <Button className="mt-4">
                      Buscar Vuelos
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {reservasRecientes.map((reserva) => (
                    <div key={reserva.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900">
                            {reserva.origen} → {reserva.destino}
                          </p>
                          <p className="text-sm text-gray-600">
                            {formatDate(reserva.fechaCreacion)}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            reserva.estado === 'confirmada' 
                              ? 'bg-green-100 text-green-800'
                              : reserva.estado === 'pendiente'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {reserva.estado}
                          </span>
                          <p className="text-sm font-medium text-gray-900 mt-1">
                            {formatPrice(reserva.montoTotal)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Vuelos favoritos */}
            <Card>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Favoritos
                </h3>
                <span className="text-sm text-gray-500">
                  {estadisticas.totalFavoritos}
                </span>
              </div>

              {favoritosRecientes.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <p className="text-sm">No tienes favoritos</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {favoritosRecientes.slice(0, 3).map((vuelo, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3">
                      <p className="font-medium text-sm text-gray-900">
                        {vuelo.airline || vuelo.aerolinea}
                      </p>
                      <p className="text-xs text-gray-600">
                        {vuelo.origin || vuelo.origen} → {vuelo.destination || vuelo.destino}
                      </p>
                      <p className="text-sm font-medium text-blue-600 mt-1">
                        {formatPrice(vuelo.price || vuelo.costo)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Acciones rápidas */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Acciones Rápidas
              </h3>
              <div className="space-y-3">
                <Link to="/vuelos" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Buscar Vuelos
                  </Button>
                </Link>
                
                <Link to="/hoteles" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Buscar Hoteles
                  </Button>
                </Link>

                <Link to="/profile" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Mi Perfil
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPresentation;