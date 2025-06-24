import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaPlane, FaHotel, FaTachometerAlt } from 'react-icons/fa';
import { supabase } from '../features/auth/authClient';
import { useLocation } from 'react-router-dom';



export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user);
    };

    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-md text-blue-900 fixed top-0 left-0 right-0 z-50">
      <div className="w-full px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2 text-xl font-bold text-blue-600">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-600">
            <FaPlane className="text-blue-500" />
            AvionesApp
          </Link>
        </div>
        <FaPlane className="animated-plane text-blue-500 absolute top-4 left-[-50px] text-xl z-0" />

     {location.pathname !== "/confirmado" && (
  <div className="flex items-center gap-6 text-sm font-medium text-gray-200">
    {user ? (
      <>
        <Link to="/dashboard" className="text-blue-900 hover:text-blue-600 font-semibold flex items-center gap-1">
          <FaTachometerAlt /> Dashboard
        </Link>
        <Link to="/vuelos" className="text-blue-900 hover:text-blue-600 font-semibold flex items-center gap-1">
          <FaPlane /> Vuelos
        </Link>
        <Link to="/hoteles" className="text-blue-900 hover:text-blue-600 font-semibold flex items-center gap-1">
          <FaHotel /> Hoteles
        </Link>
        {location.pathname !== "/profile" ?(
          <Link to="/profile" className="text-blue-900 hover:text-blue-600 font-semibold flex items-center gap-1">
            <FaUser /> Perfil
          </Link>):(
            <Link to="/" className="text-blue-900 hover:text-blue-600 font-semibold flex items-center gap-1">
            <FaUser /> Home
            </Link>)}
          <button onClick={handleLogout} className="text-blue-900 hover:text-blue-600 font-semibold flex items-center gap-1">
            <FaSignOutAlt /> Salir
          </button>
      </>
    ) : (
      <>
        <Link to="/" className="text-blue-900 hover:text-blue-600 font-semibold flex items-center gap-1">
          <FaPlane /> Home
        </Link>
        <Link to="/login" className="text-blue-900 hover:text-blue-600 font-semibold flex items-center gap-1">
          <FaSignInAlt /> Login
        </Link>
        <Link to="/signup" className="text-blue-900 hover:text-blue-600 font-semibold flex items-center gap-1">
          <FaUserPlus /> Sign up
        </Link>
      </>
    )}
  </div>
)}
    </div>

   </nav>
  );
}