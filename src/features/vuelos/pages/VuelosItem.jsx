import { useState } from "react";
import { obtenerVuelos } from "../../vuelos/service/vuelo.service.js";

export default function VuelosItem() {
  const [origen, setOrigen] = useState("EZE");
  const [destino, setDestino] = useState("MIA");
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);

  const buscarVuelos = async () => {
    setLoading(true);
    setResultados([]);

    try {
      const data = await obtenerVuelos(origen, destino);
      console.log("Respuesta:", data);

      if (data.success && data.data.length > 0) {
        setResultados(data.data);
      } else {
        alert("No se encontraron vuelos o hubo un error.");
      }
    } catch (error) {
      console.error("Error al buscar vuelos:", error);
      alert("Error en la solicitud.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h2 className="text-xl font-bold mb-4">Buscar vuelos</h2>

      <div className="flex gap-4 mb-6">
        <input
          value={origen}
          onChange={(e) => setOrigen(e.target.value.toUpperCase())}
          className="bg-gray-800 px-3 py-2 rounded"
          placeholder="Origen (ej: EZE)"
        />
        <input
          value={destino}
          onChange={(e) => setDestino(e.target.value.toUpperCase())}
          className="bg-gray-800 px-3 py-2 rounded"
          placeholder="Destino (ej: MIA)"
        />
        <button
          onClick={buscarVuelos}
          className="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-500"
        >
          Buscar
        </button>
      </div>

      {loading && <p>Cargando vuelos...</p>}

      {!loading && resultados.length > 0 && (
        <table className="w-full bg-gray-800 text-sm rounded">
          <thead className="bg-indigo-700">
            <tr>
              <th className="p-2 text-left">Vuelo</th>
              <th className="p-2 text-left">Precio (USD)</th>
              <th className="p-2 text-left">Aerolínea</th>
              <th className="p-2 text-left">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((vuelo, index) => (
              <tr key={index}>
                <td className="p-2">{vuelo.flight_number || "N/A"}</td>
                <td className="p-2">${vuelo.price}</td>
                <td className="p-2">{vuelo.airline}</td>
                <td className="p-2">
                  {new Date(vuelo.departure_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
