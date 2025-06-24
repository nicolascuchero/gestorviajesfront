import React, { useState } from 'react';
import Card from '../atoms/Card';
import Button from '../atoms/Button';
import Input from '../atoms/Input';

const FilterPanel = ({ 
  onFilterChange, 
  initialFilters = {},
  className = '' 
}) => {
  const [filters, setFilters] = useState({
    precioMin: initialFilters.precioMin || '',
    precioMax: initialFilters.precioMax || '',
    aerolinea: initialFilters.aerolinea || '',
    horaSalidaMin: initialFilters.horaSalidaMin || '',
    horaSalidaMax: initialFilters.horaSalidaMax || '',
    escalas: initialFilters.escalas || 'todas',
    ordenarPor: initialFilters.ordenarPor || 'precio',
    ...initialFilters
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (name, value) => {
    const newFilters = {
      ...filters,
      [name]: value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleFilterChange(name, value);
  };

  const clearFilters = () => {
    const clearedFilters = {
      precioMin: '',
      precioMax: '',
      aerolinea: '',
      horaSalidaMin: '',
      horaSalidaMax: '',
      escalas: 'todas',
      ordenarPor: 'precio'
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const aerolineas = [
    'Todas',
    'Aerolíneas Argentinas',
    'LATAM',
    'American Airlines',
    'United Airlines',
    'Delta',
    'Lufthansa',
    'Air France',
    'KLM'
  ];

  return (
    <Card className={`${className}`}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="md:hidden"
            >
              {isExpanded ? 'Ocultar' : 'Mostrar'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
            >
              Limpiar
            </Button>
          </div>
        </div>

        {/* Filtros */}
        <div className={`space-y-4 ${isExpanded ? 'block' : 'hidden md:block'}`}>
          {/* Precio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rango de Precio (USD)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                name="precioMin"
                placeholder="Mín"
                value={filters.precioMin}
                onChange={handleInputChange}
              />
              <Input
                type="number"
                name="precioMax"
                placeholder="Máx"
                value={filters.precioMax}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Aerolínea */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Aerolínea
            </label>
            <select
              name="aerolinea"
              value={filters.aerolinea}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {aerolineas.map((aerolinea) => (
                <option key={aerolinea} value={aerolinea === 'Todas' ? '' : aerolinea}>
                  {aerolinea}
                </option>
              ))}
            </select>
          </div>

          {/* Horario de Salida */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Horario de Salida
            </label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="time"
                name="horaSalidaMin"
                value={filters.horaSalidaMin}
                onChange={handleInputChange}
              />
              <Input
                type="time"
                name="horaSalidaMax"
                value={filters.horaSalidaMax}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Escalas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Escalas
            </label>
            <div className="space-y-2">
              {[
                { value: 'todas', label: 'Todas' },
                { value: 'directo', label: 'Solo vuelos directos' },
                { value: '1-escala', label: 'Máximo 1 escala' },
                { value: '2-escalas', label: 'Máximo 2 escalas' }
              ].map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="escalas"
                    value={option.value}
                    checked={filters.escalas === option.value}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Ordenar por */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ordenar por
            </label>
            <select
              name="ordenarPor"
              value={filters.ordenarPor}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="precio">Precio (menor a mayor)</option>
              <option value="precio-desc">Precio (mayor a menor)</option>
              <option value="duracion">Duración</option>
              <option value="salida">Hora de salida</option>
              <option value="llegada">Hora de llegada</option>
              <option value="aerolinea">Aerolínea</option>
            </select>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FilterPanel;