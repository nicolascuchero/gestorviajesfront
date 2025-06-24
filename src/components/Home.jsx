import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../features/auth/authClient';

export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser(data.user);
    });
  }, []);

  const handleBuscar = () => {
    if (user) {
      navigate('/vuelos'); 
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="h-screen bg-cover bg-center flex flex-col items-center justify-center text-white"
         style={{ backgroundImage: `url('/Avion.png')` }}>
      <div className="bg-black bg-opacity-70 p-8 rounded-lg text-center max-w-xl">
        <h1 className="text-4xl font-bold mb-4">Descubrí tu próximo destino ✈️</h1>
        <p className="text-lg mb-6">Compará precios, elegí el mejor vuelo y viví tu aventura. ¡Todo desde un solo lugar!</p>
        <button
          onClick={handleBuscar}
          className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded text-white font-semibold transition"
        >
          Buscar vuelos
        </button>
        {!user && (
          <p className="text-sm mt-4">
            <Link to="/SignUp" className="underline hover:text-blue-300">Registrate</Link> para acceder a las ofertas exclusivas.
          </p>
        )}
      </div>
    </div>
  );
}