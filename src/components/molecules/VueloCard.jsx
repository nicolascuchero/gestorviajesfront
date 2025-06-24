import React from 'react';
import Card from '../atoms/Card';
import Button from '../atoms/Button';

const VueloCard = ({
  vuelo,
  onSelect,
  onFavorite,
  isFavorite = false,
  showActions = true,
  className = ''
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price) => {
    if (!price) return 'Consultar';
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDuration = (duration) => {
    const horas = Math.floor(duration / 60);
    const minutos = duration % 60;

    const horasFormateadas = String(horas).padStart(2, '0');
    const minutosFormateados = String(minutos).padStart(2, '0');

    return `${horasFormateadas}hs ${minutosFormateados}min`;
  }

  return (
    <Card hover className={`transition-all duration-200 ${className}`}>
      <div className="flex flex-col space-y-4">
        {/* Header con aerolínea */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {vuelo.gate || vuelo.airline || vuelo.aerolinea || 'Aerolínea'}
            </h3>
            <p className="text-sm text-gray-500">
              {"N°"+(vuelo.flight_number || vuelo.numeroVuelo || 'N/A')}
            </p>
          </div>

          {showActions && (
            <button
              onClick={() => onFavorite && onFavorite(vuelo)}
              className={`p-2 rounded-full transition-colors ${isFavorite
                  ? 'text-red-500 hover:text-red-600'
                  : 'text-gray-400 hover:text-red-500'
                }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>

        {/* Información del vuelo */}
        <div className="grid grid-cols-3 gap-4 items-center">
          {/* Origen */}
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              {formatDate(vuelo.depart_date || vuelo.departure_at || vuelo.fechaHoraSalida)}
            </p>
            <p className="text-sm text-gray-600">
              {vuelo.origin || vuelo.origen || 'Origen'}
            </p>
            <p className="text-xs text-gray-500">
              {formatTime(vuelo.depart_date || vuelo.departure_at || vuelo.fechaHoraSalida)}
            </p>
          </div>

          {/* Duración/Conexión */}
          <div className="text-center">
            <div className="flex items-center justify-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <div className="px-2">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>
            {/* <p className="text-xs text-gray-500 mt-1">
              {`${vuelo.distance} km`}
            </p> */}
            <p className="text-xs text-gray-500 mt-1">
              {formatDuration(vuelo.duration_to || 'Directo') + " (ida)"}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {formatDuration(vuelo.duration_back || 'Directo') + " (vuelta)"}
            </p>
          </div>

          {/* Destino */}
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              {formatDate(vuelo.return_date || vuelo.return_at || vuelo.fechaHoraLlegada)}
            </p>
            <p className="text-sm text-gray-600">
              {vuelo.destination || vuelo.destino || 'Destino'}
            </p>
            <p className="text-xs text-gray-500">
              {formatTime(vuelo.return_date || vuelo.return_at || vuelo.fechaHoraLlegada)}
            </p>
          </div>
        </div>

        {/* Información adicional */}
        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-blue-600">
              {formatPrice(vuelo.value || vuelo.price || vuelo.costo)}
            </span>
            {vuelo.asientosDisponibles && (
              <span className="text-xs text-gray-500">
                {vuelo.asientosDisponibles} asientos disponibles
              </span>
            )}
          </div>

          {showActions && onSelect && (
            <Button
              onClick={() => onSelect(vuelo)}
              variant="primary"
              size="sm"
            >
              Seleccionar
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default VueloCard;