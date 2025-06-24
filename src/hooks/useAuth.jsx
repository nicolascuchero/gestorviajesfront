import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "../features/auth/authClient";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerSesion = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUsuario(session?.user || null);
      setCargando(false);
    };

    obtenerSesion();

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUsuario(session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUsuario(null);
  };

  const registrar = async (datosUsuario) => {
    const { data, error } = await supabase.auth.signUp({
      email: datosUsuario.email,
      password: datosUsuario.password,
      options: {
        data: {
          nombre: datosUsuario.nombre,
          apellido: datosUsuario.apellido,
        },
      },
    });

    if (error) throw error;
    return data;
  };

  return (
    <AuthContext.Provider value={{ usuario, cargando, login, logout, registrar }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};

