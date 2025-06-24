import React from 'react';
import Card from '../atoms/Card';
import Button from '../atoms/Button';

const HotelCard = ({ 
  hotel, 
  onSelect, 
  showActions = true,
  className = '' 
}) => {
  const formatPrice = (price) => {
    if (!price) return 'Consultar';
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const renderStars = (estrellas) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 ${
          index < estrellas ? 'text-yellow-400' : 'text-gray-300'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const renderServicios = (servicios) => {
    if (!servicios || servicios.length === 0) return null;
    
    const serviciosIconos = {
      'WiFi': '📶',
      'Piscina': '🏊',
      'Gimnasio': '💪',
      'Spa': '🧘',
      'Restaurante': '🍽️',
      'Bar': '🍸',
      'Estacionamiento': '🚗',
      'Aire acondicionado': '❄️',
      'Desayuno': '🥐',
      'Room service': '🛎️',
      'Lavandería': '👕',
      'Centro de negocios': '💼'
    };

    return servicios.slice(0, 6).map((servicio, index) => (
      <span
        key={index}
        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 mr-1 mb-1"
      >
        <span className="mr-1">{serviciosIconos[servicio] || '•'}</span>
        {servicio}
      </span>
    ));
  };

  return (
    <Card hover className={`transition-all duration-200 ${className}`}>
      <div className="flex flex-col space-y-4">
        {/* Header con nombre y estrellas */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {hotel.nombre}
            </h3>
            <div className="flex items-center space-x-2">
              <div className="flex">
                {renderStars(hotel.estrellas)}
              </div>
              <span className="text-sm text-gray-600">
                {hotel.estrellas} estrella{hotel.estrellas !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>

        {/* Ubicación */}
        <div className="flex items-center text-gray-600">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <div>
            <p className="text-sm font-medium">
              {hotel.ubicacion?.nombre || 'Ubicación no especificada'}
            </p>
            <p className="text-xs text-gray-500">
              {hotel.direccion}
            </p>
            {hotel.ubicacion && (
              <p className="text-xs text-gray-500">
                {hotel.ubicacion.ciudad}, {hotel.ubicacion.pais}
              </p>
            )}
          </div>
        </div>

        {/* Servicios */}
        {hotel.servicios && hotel.servicios.length > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Servicios:</p>
            <div className="flex flex-wrap">
              {renderServicios(hotel.servicios)}
              {hotel.servicios.length > 6 && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                  +{hotel.servicios.length - 6} más
                </span>
              )}
            </div>
          </div>
        )}

        {/* Precio y acciones */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-blue-600">
              {formatPrice(hotel.precioPorNoche)}
            </span>
            <span className="text-xs text-gray-500">por noche</span>
          </div>

          {showActions && onSelect && (
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {/* Ver detalles */}}
              >
                Ver detalles
              </Button>
              <Button
                onClick={() => onSelect(hotel)}
                variant="primary"
                size="sm"
              >
                Seleccionar
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default HotelCard;